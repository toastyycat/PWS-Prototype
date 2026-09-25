import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import './style.css';
import { BookingApp } from './participant/BookingApp';
import { ResearchApp } from './researcher/ResearchApp';
import { DESIGN_PAIRS, getCombinedVariant, getScenario, parseDemoQuery } from './shared/protocol';
import type { ContentVersion, InfoTaskId, Pair, TaskChoice } from './shared/protocol';

const path = window.location.pathname;

function ParticipantDemo() {
  const [demo, setDemo] = useState(() => parseDemoQuery(window.location.search));
  const update = (selectedDesigns: Pair[], selectedTasks: TaskChoice[], activeTask: TaskChoice | null) => {
    const infoTask = activeTask?.startsWith('I') ? activeTask as InfoTaskId : null;
    const content = activeTask && !infoTask ? activeTask as ContentVersion : demo.content;
    const url = new URL(window.location.href);
    url.searchParams.set('designs', selectedDesigns.join(','));
    url.searchParams.set('inhoud', content);
    url.searchParams.set('opdrachten', selectedTasks.join(','));
    if (infoTask) url.searchParams.set('info', infoTask);
    else url.searchParams.delete('info');
    window.history.replaceState(null, '', url);
    setDemo(previous => ({ ...previous, selectedDesigns, content, infoTask, selectedTasks }));
  };
  const activeTask = demo.selectedTasks.includes((demo.infoTask || demo.content) as TaskChoice) ? demo.infoTask || demo.content : demo.selectedTasks[0] || null;
  const toggleDesign = (pair: Pair) => update(demo.selectedDesigns.includes(pair) ? demo.selectedDesigns.filter(item => item !== pair) : [...demo.selectedDesigns, pair], demo.selectedTasks, activeTask);
  const toggleAllDesigns = () => update(DESIGN_PAIRS.every(pair => demo.selectedDesigns.includes(pair)) ? [] : [...DESIGN_PAIRS], demo.selectedTasks, activeTask);
  const toggleTask = (task: TaskChoice) => {
    const selectedTasks = demo.selectedTasks.includes(task) ? demo.selectedTasks.filter(item => item !== task) : [...demo.selectedTasks, task];
    update(demo.selectedDesigns, selectedTasks, activeTask === task ? selectedTasks[0] || null : activeTask || task);
  };
  const chooseActive = (task: TaskChoice) => update(demo.selectedDesigns, demo.selectedTasks, task);
  const activeContent = activeTask && !activeTask.startsWith('I') ? activeTask as ContentVersion : demo.content;
  return <BookingApp scenario={getScenario(demo.pair, activeContent)} selectedTasks={demo.selectedTasks}
    activeTask={activeTask} variant={getCombinedVariant(demo.selectedDesigns)} selectedDesigns={demo.selectedDesigns} scale={demo.scale}
    onDesignToggle={toggleDesign} onAllDesignsToggle={toggleAllDesigns} onTaskToggle={toggleTask} onActiveTaskChange={chooseActive} />;
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
