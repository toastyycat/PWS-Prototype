import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import './style.css';
import { BookingApp } from './participant/BookingApp';
import { ResearchApp } from './researcher/ResearchApp';
import { getScenario, getVariant, parseDemoQuery } from './shared/protocol';

const path = window.location.pathname;
const demo = parseDemoQuery(window.location.search);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {path === '/onderzoek' || path === '/print/opdrachten' ? (
      <ResearchApp printMode={path === '/print/opdrachten'} />
    ) : (
      <BookingApp scenario={getScenario(demo.pair, demo.content)} variant={getVariant(demo.pair, demo.version)} scale={demo.scale} />
    )}
  </React.StrictMode>,
);
