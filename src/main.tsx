import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import './style.css';
import { BookingApp } from './participant/BookingApp';
import { ResearchApp } from './researcher/ResearchApp';
import { getScenario, getVariant, parseDemoQuery } from './shared/protocol';
import type { ContentVersion, InfoTaskId, Pair, TaskChoice, Version } from './shared/protocol';

const path = window.location.pathname;

function ParticipantDemo() {
  const [demo, setDemo] = useState(() => parseDemoQuery(window.location.search));
  const choose = (pair: Pair, version: Version, task: TaskChoice) => {
    const infoTask = task.startsWith('I') ? task as InfoTaskId : null;
    const content = infoTask ? demo.content : task as ContentVersion;
    const url = new URL(window.location.href);
    url.searchParams.set('paar', String(pair));
    url.searchParams.set('variant', version);
    url.searchParams.set('inhoud', content);
    if (infoTask) url.searchParams.set('info', infoTask);
    else url.searchParams.delete('info');
    window.history.replaceState(null, '', url);
    setDemo(previous => ({ ...previous, pair, version, content, infoTask }));
  };
  return <BookingApp scenario={getScenario(demo.pair, demo.content)} infoTask={demo.infoTask} variant={getVariant(demo.pair, demo.version)} scale={demo.scale} onVariantChange={choose} />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {path === '/onderzoek' || path === '/print/opdrachten' ? (
      <ResearchApp printMode={path === '/print/opdrachten'} />
    ) : (
      <ParticipantDemo />
    )}
  </React.StrictMode>,
);
