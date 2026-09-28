import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const rosterPath = join(process.cwd(), 'public', 'deelnemers.csv');
const resultsDir = process.env.PWS_RESULTS_DIR || join(process.cwd(), 'data');
const resultsPath = join(resultsDir, 'taakduren.csv');
const header = '\uFEFFdeelnemerscode;taak;duur_seconden\r\n';

function rosterFor(code: string): string[] {
  return readFileSync(rosterPath, 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1)
    .map(line => line.split(';')).filter(parts => parts[0] === code).map(parts => parts[3]);
}

function completedFor(code: string): string[] {
  if (!existsSync(resultsPath)) return [];
  return readFileSync(resultsPath, 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1)
    .map(line => line.split(';')).filter(parts => parts[0] === code).map(parts => parts[1]);
}

function json(response: ServerResponse, status: number, value: unknown) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(value));
}

async function handle(request: IncomingMessage, response: ServerResponse, next: () => void) {
  const path = new URL(request.url || '/', 'http://localhost').pathname;
  if (path === '/api/taakduren.csv' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="taakduren.csv"', 'Cache-Control': 'no-store' });
    response.end(existsSync(resultsPath) ? readFileSync(resultsPath) : header);
    return;
  }
  const progress = path.match(/^\/api\/voortgang\/(D(?:0[1-9]|1\d|2[0-5]))$/);
  if (progress && request.method === 'GET') {
    const tasks = rosterFor(progress[1]);
    if (tasks.length !== 15) return json(response, 404, { error: 'Deelnemerscode niet gevonden.' });
    return json(response, 200, { completed: completedFor(progress[1]) });
  }
  if (path !== '/api/taakduren' || request.method !== 'POST') return next();
  try {
    let body = '';
    for await (const chunk of request) {
      body += chunk;
      if (body.length > 1000) return json(response, 413, { error: 'Verzoek te groot.' });
    }
    const { code, task, durationMs } = JSON.parse(body);
    if (typeof code !== 'string' || !/^D(?:0[1-9]|1\d|2[0-5])$/.test(code) || typeof task !== 'string' || !/^T(?:0[1-9]|1[0-5])$/.test(task)
      || typeof durationMs !== 'number' || !Number.isFinite(durationMs) || durationMs < 0 || durationMs > 3_600_000) {
      return json(response, 400, { error: 'Ongeldige taakregistratie.' });
    }
    const tasks = rosterFor(code);
    const completed = completedFor(code);
    if (completed.includes(task)) return json(response, 200, { saved: true, duplicate: true });
    if (tasks[completed.length] !== task) return json(response, 409, { error: 'Deze taak is niet de volgende opdracht.' });
    mkdirSync(resultsDir, { recursive: true });
    if (!existsSync(resultsPath)) writeFileSync(resultsPath, header, 'utf8');
    appendFileSync(resultsPath, `${code};${task};${(durationMs / 1000).toFixed(3)}\r\n`, 'utf8');
    return json(response, 200, { saved: true });
  } catch {
    return json(response, 500, { error: 'Taakduur kon niet worden opgeslagen.' });
  }
}

export function taskCsvPlugin(): Plugin {
  return {
    name: 'task-csv-api',
    configureServer(server) { server.middlewares.use((req, res, next) => { void handle(req, res, next); }); },
    configurePreviewServer(server) { server.middlewares.use((req, res, next) => { void handle(req, res, next); }); },
  };
}
