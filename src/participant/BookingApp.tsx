import { useEffect, useReducer, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { gsap } from 'gsap';
import type { InfoTaskId, Pair, Scenario, Service, TaskChoice, Time, VariantConfig, Version } from '../shared/protocol';
import { assignment, BOOKING_MONTHS, EXTRA_TASK_IDS, FAKE_LOGIN_EMAIL, formatDate, formatMonth, INFO_TASKS, isBookableDate, PAIR_NAMES, SERVICES, TIMES } from '../shared/protocol';
import { mainNavigation, pageById, sitePages } from './siteContent';

type Screen = 'setup' | 'home' | 'info' | 'profile' | 'search' | 'login' | 'account' | 'service' | 'date' | 'time' | 'review' | 'confirmation';
type ChoiceScreen = 'service' | 'date' | 'time';

interface BookingState {
  screen: Screen;
  pageId: string | null;
  profileReturn: Screen;
  service: Service | null;
  date: string | null;
  time: Time | null;
  editReturn: boolean;
  menuOpen: boolean;
  validation: string;
  loggedIn: boolean;
}

type Action =
  | { type: 'START_PARTICIPANT' | 'OPEN_BOOKING' | 'OPEN_HOME' | 'OPEN_PROFILE' | 'CLOSE_PROFILE' | 'OPEN_SEARCH' | 'OPEN_LOGIN' | 'LOGIN_SUCCESS' | 'LOGOUT' | 'TOGGLE_MENU' | 'BACK' | 'NEXT' | 'CONFIRM' | 'CHANGE_BOOKING' }
  | { type: 'OPEN_PAGE'; pageId: string }
  | { type: 'NAVIGATE'; screen: 'home' | 'info' | 'search' | 'login'; pageId: string | null }
  | { type: 'SELECT_SERVICE'; service: Service }
  | { type: 'SELECT_DATE'; date: string }
  | { type: 'SELECT_TIME'; time: Time }
  | { type: 'EDIT'; screen: ChoiceScreen };

function readSiteRoute(): { screen: 'home' | 'info' | 'search' | 'login'; pageId: string | null } {
  if (window.location.pathname === '/zoeken') return { screen: 'search', pageId: null };
  if (window.location.pathname === '/inloggen') return { screen: 'login', pageId: null };
  const match = window.location.pathname.match(/^\/informatie\/([a-z0-9-]+)\/?$/);
  return match && pageById[match[1]] ? { screen: 'info', pageId: match[1] } : { screen: 'home', pageId: null };
}

const initialState: BookingState = {
  screen: 'setup', pageId: null, profileReturn: 'home', service: null, date: null, time: null,
  editReturn: false, menuOpen: false, validation: '', loggedIn: false,
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'START_PARTICIPANT': return { ...state, screen: 'home', pageId: null, service: null, date: null, time: null, editReturn: false, menuOpen: false, validation: '' };
    case 'NAVIGATE': return { ...state, screen: action.screen, pageId: action.pageId, menuOpen: false, validation: '' };
    case 'OPEN_HOME': return { ...state, screen: 'home', pageId: null, menuOpen: false, validation: '' };
    case 'OPEN_PAGE': return { ...state, screen: 'info', pageId: action.pageId, menuOpen: false, validation: '' };
    case 'OPEN_BOOKING': return { ...state, screen: 'service', menuOpen: false, validation: '' };
    case 'OPEN_SEARCH': return { ...state, screen: 'search', pageId: null, menuOpen: false, validation: '' };
    case 'OPEN_LOGIN': return { ...state, screen: state.loggedIn ? 'account' : 'login', pageId: null, menuOpen: false, validation: '' };
    case 'LOGIN_SUCCESS': return { ...state, screen: 'account', loggedIn: true, validation: '' };
    case 'LOGOUT': return { ...state, screen: 'login', loggedIn: false, validation: '' };
    case 'OPEN_PROFILE': return { ...state, profileReturn: state.screen, screen: 'profile', menuOpen: false };
    case 'CLOSE_PROFILE': return { ...state, screen: state.profileReturn };
    case 'TOGGLE_MENU': return { ...state, menuOpen: !state.menuOpen };
    case 'SELECT_SERVICE': return { ...state, service: action.service, validation: '' };
    case 'SELECT_DATE': return { ...state, date: action.date, validation: '' };
    case 'SELECT_TIME': return { ...state, time: action.time, validation: '' };
    case 'BACK': {
      const previous: Record<ChoiceScreen | 'review', Screen> = { service: 'home', date: 'service', time: 'date', review: 'time' };
      if (state.screen in previous) return { ...state, screen: previous[state.screen as keyof typeof previous], menuOpen: false, editReturn: false, validation: '' };
      return state;
    }
    case 'NEXT': {
      const required: Partial<Record<Screen, [boolean, string, Screen]>> = {
        service: [Boolean(state.service), 'Kies een behandeling.', 'date'],
        date: [Boolean(state.date), 'Kies een datum.', 'time'],
        time: [Boolean(state.time), 'Kies een tijd.', 'review'],
      };
      const step = required[state.screen];
      if (!step) return state;
      if (!step[0]) return { ...state, validation: step[1], menuOpen: false };
      return { ...state, screen: state.editReturn ? 'review' : step[2], editReturn: false, menuOpen: false, validation: '' };
    }
    case 'EDIT': return { ...state, screen: action.screen, editReturn: true, menuOpen: false, validation: '' };
    case 'CONFIRM': {
      if (state.screen === 'confirmation') return state;
      if (state.screen !== 'review') return state;
      if (!state.service || !state.date || !state.time) return { ...state, validation: 'Controleer eerst uw afspraak.' };
      return { ...state, screen: 'confirmation', menuOpen: false, validation: '' };
    }
    case 'CHANGE_BOOKING': return { ...state, screen: 'review', menuOpen: false };
  }
}

const TITLES: Record<Exclude<Screen, 'setup' | 'home' | 'profile' | 'search' | 'login' | 'account'>, string> = {
  info: 'Informatie',
  service: 'Welke afspraak wilt u maken?',
  date: 'Kies een datum',
  time: 'Kies een tijd',
  review: 'Controleer uw afspraak',
  confirmation: 'Afspraak geboekt',
};

const serviceDetails: Record<Service, { description: string; image: string }> = {
  Intake: { description: 'Een eerste gesprek over uw vraag en uw wensen.', image: '/images/praktijk.png' },
  Behandeling: { description: 'Een vervolgafspraak met persoonlijke begeleiding.', image: '/images/therapie-hero.png' },
  Oefentherapie: { description: 'Samen oefenen om makkelijker te bewegen.', image: '/images/groep-bewegen.webp' },
  'Manuele therapie': { description: 'Aandacht voor het bewegen van gewrichten.', image: '/images/manuele-therapie.png' },
  Sportfysiotherapie: { description: 'Begeleiding bij terugkeer naar sport en bewegen.', image: '/images/sportfysiotherapie.png' },
  Ergotherapie: { description: 'Ondersteuning bij dagelijkse handelingen.', image: '/images/dagelijks-bewegen.webp' },
};

function ServiceCard({ service, selected, onClick }: { service: Service; selected: boolean; onClick: () => void }) {
  const detail = serviceDetails[service];
  return <button type="button" role="radio" aria-checked={selected} className={`service-card ${selected ? 'is-selected' : ''}`} onClick={onClick}>
    <img src={detail.image} alt="" />
    <span className="service-card-copy"><span className="service-card-heading"><strong>{service}</strong><span className="radio-mark" aria-hidden="true">{selected ? '✓' : ''}</span></span><span>{detail.description}</span></span>
  </button>;
}

function ChoiceCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" role="radio" aria-checked={selected} className={`choice-card ${selected ? 'is-selected' : ''}`} onClick={onClick}>
      <span className="radio-mark" aria-hidden="true">{selected ? '✓' : ''}</span>
      <span>{label}</span>
    </button>
  );
}

function Calendar({ initialMonth, selected, onSelect }: { initialMonth: string; selected: string | null; onSelect: (date: string) => void }) {
  const [month, setMonth] = useState(selected?.slice(0, 7) || initialMonth);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const monthIndex = BOOKING_MONTHS.indexOf(month as typeof BOOKING_MONTHS[number]);
  const [year, monthNumber] = month.split('-').map(Number);
  const firstWeekday = (new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstWeekday + 1;
    return day >= 1 && day <= daysInMonth ? `${month}-${String(day).padStart(2, '0')}` : null;
  });
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: string) => {
    const increment: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(event.key in increment)) return;
    event.preventDefault();
    const day = Number(date.slice(-2));
    let next = day + increment[event.key];
    while (next >= 1 && next <= daysInMonth) {
      const key = `${month}-${String(next).padStart(2, '0')}`;
      if (isBookableDate(key)) { buttonRefs.current[key]?.focus(); return; }
      next += increment[event.key];
    }
  };
  return (
    <div className="calendar" aria-label="Kies een werkdag">
      <div className="calendar-toolbar">
        <button type="button" className="calendar-month-button" disabled={monthIndex <= 0} onClick={() => setMonth(BOOKING_MONTHS[monthIndex - 1])} aria-label="Vorige maand">←</button>
        <h2 className="calendar-title" aria-live="polite">{formatMonth(month)}</h2>
        <button type="button" className="calendar-month-button" disabled={monthIndex >= BOOKING_MONTHS.length - 1} onClick={() => setMonth(BOOKING_MONTHS[monthIndex + 1])} aria-label="Volgende maand">→</button>
      </div>
      <p className="calendar-hint">Alle werkdagen zijn beschikbaar. Weekenden zijn gesloten.</p>
      <div className="calendar-grid" role="grid" aria-label={formatMonth(month)}>
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(day => <span className="weekday" key={day} role="columnheader">{day}</span>)}
        {cells.map((date, index) => {
          const active = Boolean(date && isBookableDate(date));
          return date ? (
            <button
              key={date} type="button" role="gridcell" ref={element => { buttonRefs.current[date] = element; }}
              disabled={!active} aria-label={`${formatDate(date)}${active ? '' : ', niet beschikbaar'}`}
              aria-selected={selected === date} className={`date-cell ${selected === date ? 'is-selected' : ''}`}
              onClick={() => active && onSelect(date)} onKeyDown={event => onKeyDown(event, date)}
            >{Number(date.slice(-2))}</button>
          ) : <span key={`empty-${index}`} className="date-empty" aria-hidden="true" />;
        })}
      </div>
      <p className="selected-date" aria-live="polite">{selected ? `Gekozen: ${formatDate(selected)}` : 'Nog geen datum gekozen'}</p>
    </div>
  );
}

function Navigation({ visible, open, onToggle, onBack, onNext, review }: {
  visible: boolean; open: boolean; onToggle: () => void; onBack: () => void; onNext: () => void; review?: boolean;
}) {
  return (
    <div className="navigation-area">
      {!visible && <button type="button" className="menu-button" aria-expanded={open} aria-controls="step-navigation" onClick={onToggle}>Menu</button>}
      <div className="navigation-slot" id="step-navigation">
        {(visible || open) && <div className="navigation-buttons">
          <button type="button" className="action-button" onClick={onBack}>Terug</button>
          {!review && <button type="button" className="action-button" onClick={onNext}>Verder</button>}
        </div>}
      </div>
    </div>
  );
}

function DesktopNavGroup({ group, openPage }: { group: (typeof mainNavigation)[number]; openPage: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="nav-group" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
    onFocus={() => setOpen(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); (event.currentTarget.querySelector('.nav-trigger') as HTMLButtonElement)?.focus(); } }}>
    <button type="button" className="nav-trigger" aria-expanded={open} aria-controls={`nav-${group.id}`}>{group.label}<span aria-hidden="true">⌄</span></button>
    {open && <div className="nav-dropdown" id={`nav-${group.id}`}>
      <button type="button" className="nav-parent" onClick={() => openPage(group.id)}>Overzicht {group.label} <span aria-hidden="true">→</span></button>
      {group.children.map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}
    </div>}
  </div>;
}

function LoadingScreen({ skeleton }: { skeleton: boolean }) {
  return <div className={`loading-screen ${skeleton ? 'loading-skeleton' : 'loading-blank'}`} role="status" aria-live="polite">
    <span className="visually-hidden">Pagina wordt geladen</span>
    {skeleton && <div className="skeleton-layout" aria-hidden="true">
      <div className="skeleton-top" /><div className="skeleton-nav" />
      <div className="skeleton-hero"><div><i /><i /><i /></div><span /></div>
      <div className="skeleton-content"><i /><i /><div><span /><span /><span /></div></div>
    </div>}
  </div>;
}

function searchPages(query: string) {
  const terms = query.toLocaleLowerCase('nl-NL').trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return sitePages.filter(page => {
    const haystack = [page.title, page.category, page.intro, ...page.sections.flatMap(section => [section.title, section.text])].join(' ').toLocaleLowerCase('nl-NL');
    return terms.every(term => haystack.includes(term));
  });
}

export function BookingApp({ scenario, infoTask, variant, scale, onVariantChange }: { scenario: Scenario; infoTask: InfoTaskId | null; variant: VariantConfig; scale: number; onVariantChange: (pair: Pair, version: Version, task: TaskChoice) => void }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const [submittedSearch, setSubmittedSearch] = useState(searchTerm);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const bookingRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handlePopState = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      loadingRef.current = false;
      setLoading(false);
      setSubmittedSearch(new URLSearchParams(window.location.search).get('q') || '');
      dispatch({ type: 'NAVIGATE', ...readSiteRoute() });
    };
    window.addEventListener('popstate', handlePopState);
    return () => { window.removeEventListener('popstate', handlePopState); if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);
  useEffect(() => {
    if (state.screen !== 'home') bookingRef.current?.focus();
    window.scrollTo(0, 0);
  }, [state.screen, state.pageId]);
  const isLargeFull = variant.pair === 5 && variant.largeText;
  const rootClass = [
    'participant-app', state.screen === 'home' ? 'is-home' : '',
    variant.largeText ? 'has-large-text' : '',
    isLargeFull ? 'has-large-headings' : '',
    variant.highContrast ? 'has-high-contrast' : '',
    !variant.highContrast && (variant.pair === 3 || variant.pair === 5) ? 'has-low-contrast' : '',
    variant.emphasizedAction ? 'has-emphasized-action' : '',
  ].filter(Boolean).join(' ');
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = variant.animatedConfirmation && !reducedMotion;
  useEffect(() => {
    if (!canAnimate || loading || state.screen === 'setup') return;
    const main = bookingRef.current;
    if (!main) return;
    const context = gsap.context(() => {
      gsap.fromTo(main, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .42, ease: 'power2.out' });
      const items = main.querySelectorAll('.service-card, .site-card, .quick-links button, .time-grid button, .review-row, .search-result');
      if (items.length) gsap.fromTo(items, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .38, stagger: .055, delay: .1, ease: 'power2.out' });
      if (state.screen === 'confirmation') {
        gsap.fromTo(main.querySelectorAll('.confirmation-symbol, .confirmation-screen h1, .confirmation-screen p, .confirmation-screen button'),
          { opacity: 0, y: 18, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .5, stagger: .11, ease: 'back.out(1.25)' });
      }
    }, main);
    return () => context.revert();
  }, [canAnimate, loading, state.screen, state.pageId]);
  const navigate = (action: Action) => {
    if (variant.pair !== 6) { dispatch(action); return; }
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    timerRef.current = setTimeout(() => { dispatch(action); loadingRef.current = false; setLoading(false); timerRef.current = null; }, 1400);
  };
  const stepNumber: Partial<Record<Screen, number>> = { service: 1, date: 2, time: 3, review: 4 };
  const isSitePage = ['home', 'info', 'profile', 'search', 'login', 'account'].includes(state.screen);
  const isBooking = !isSitePage;
  const openPage = (pageId: string) => {
    if (window.location.pathname !== `/informatie/${pageId}`) window.history.pushState(null, '', `/informatie/${pageId}${window.location.search}`);
    navigate({ type: 'OPEN_PAGE', pageId });
  };
  const openHome = () => {
    if (window.location.pathname !== '/') window.history.pushState(null, '', `/${window.location.search}`);
    navigate({ type: 'OPEN_HOME' });
  };
  const startBooking = () => {
    if (window.location.pathname !== '/') window.history.pushState(null, '', `/${window.location.search}`);
    navigate({ type: 'OPEN_BOOKING' });
  };
  const openLogin = () => {
    if (window.location.pathname !== '/inloggen') window.history.pushState(null, '', `/inloggen${window.location.search}`);
    setLoginError('');
    navigate({ type: 'OPEN_LOGIN' });
  };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    setSubmittedSearch(query);
    const url = new URL(window.location.href);
    url.pathname = '/zoeken';
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    window.history.pushState(null, '', url);
    navigate({ type: 'OPEN_SEARCH' });
  };
  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginEmail.trim().toLowerCase() !== FAKE_LOGIN_EMAIL) { setLoginError('Dit oefenadres klopt niet. Controleer het adres op de opdrachtkaart.'); return; }
    setLoginError('');
    navigate({ type: 'LOGIN_SUCCESS' });
  };
  const page = state.pageId ? pageById[state.pageId] : null;

  if (state.screen === 'setup') return (<>
    <main className="research-setup">
      <div className="research-setup-card">
        <p className="research-setup-kicker">PWS · onderzoeksvoorbereiding</p>
        <h1>Stel de oefenopdracht in</h1>
        <p>Kies de test, variant en opdracht voordat het deelnemersscherm verschijnt.</p>
        <div className="research-setup-fields">
          <fieldset className="toggle-fieldset"><legend>Onderzoekstest</legend><div className="toggle-grid test-toggles">
            {([1, 2, 3, 4, 5, 6] as Pair[]).map(pair => <button type="button" key={pair} className="research-toggle" aria-pressed={variant.pair === pair}
              onClick={() => onVariantChange(pair, variant.version, infoTask || scenario.content)}><strong>Test {pair}</strong><span>{PAIR_NAMES[pair]}</span></button>)}
          </div></fieldset>
          <fieldset className="toggle-fieldset"><legend>Variant</legend><div className="toggle-grid two-toggles">
            {(['A', 'B'] as Version[]).map(version => <button type="button" key={version} className="research-toggle" aria-pressed={variant.version === version}
              onClick={() => onVariantChange(variant.pair, version, infoTask || scenario.content)}>Variant {version}{variant.pair === 6 ? <span>{version === 'A' ? 'Zonder laadbeeld' : 'Skeletscherm'}</span> : null}</button>)}
          </div></fieldset>
          <fieldset className="toggle-fieldset"><legend>Opdracht</legend><div className="toggle-grid task-toggles">
            {(['X', 'Y', 'Z', 'W'] as const).map(code => <button type="button" key={code} className="research-toggle" aria-pressed={!infoTask && scenario.content === code}
              onClick={() => onVariantChange(variant.pair, variant.version, code)}>Boeking {code}</button>)}
            {EXTRA_TASK_IDS.map(code => <button type="button" key={code} className="research-toggle" aria-pressed={infoTask === code}
              onClick={() => onVariantChange(variant.pair, variant.version, code)}>{code === 'I5' ? 'Inloggen' : `Siteopdracht ${code}`}</button>)}
          </div></fieldset>
        </div>
        <div className="research-setup-assignment"><strong>Lees aan de deelnemer voor</strong><p>{infoTask ? INFO_TASKS[infoTask].prompt : assignment(scenario)}</p></div>
        {infoTask && <p className="research-setup-answer"><strong>Voor de onderzoeker:</strong> {INFO_TASKS[infoTask].expectedAnswer}</p>}
        <p className="research-setup-note">{infoTask ? 'Deze extra opdracht staat los van de A/B-boekingstests.' : 'De gekozen variant blijft actief tijdens deze oefenboeking.'} De deelnemer ziet de opdracht en onderzoeksinstellingen niet op de praktijksite.</p>
        <button type="button" className="research-setup-start" onClick={() => {
          if (window.location.pathname !== '/') window.history.replaceState(null, '', `/${window.location.search}`);
          navigate({ type: 'START_PARTICIPANT' });
        }}>Start deelnemersscherm <span aria-hidden="true">→</span></button>
      </div>
    </main>
    {loading && <LoadingScreen skeleton={variant.skeletonLoading} />}
  </>);

  return (
    <div className={rootClass} style={{ '--text-scale': scale / 100 } as React.CSSProperties}>
      {state.screen !== 'confirmation' && <header className="site-header">
        <div className="site-header-inner">
          <button type="button" className="brand brand-button" onClick={openHome}>Fysiotherapie<span className="brand-place"> Valkenswaard</span></button>
          <form className="site-search" role="search" onSubmit={submitSearch}>
            <label className="visually-hidden" htmlFor="site-search-input">Zoeken op de site</label>
            <input id="site-search-input" type="search" placeholder="Waar zoekt u naar?" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            <button type="submit">Zoeken</button>
          </form>
          <button type="button" className="header-login" onClick={openLogin}>{state.loggedIn ? 'Mijn account' : 'Inloggen'}</button>
          <span className="environment-label">Fictieve oefenomgeving</span>
        </div>
        <nav className="site-nav" aria-label="Hoofdnavigatie" key={`${state.screen}-${state.pageId}`}>
          <div className="site-nav-inner">
            {mainNavigation.map(group => <DesktopNavGroup group={group} openPage={openPage} key={group.id} />)}
            <button type="button" className="nav-plain" onClick={() => openPage('tarieven')}>Tarieven</button>
            <button type="button" className="nav-plain" onClick={() => openPage('contact')}>Contact</button>
            {isBooking ? <span className="nav-appointment nav-current" aria-current="page">Afspraak maken</span> : <button type="button" className="nav-appointment" onClick={startBooking}>Afspraak maken</button>}
          </div>
          <details className="mobile-site-menu">
            <summary aria-label="Hoofdmenu"><span className="hamburger-icon" aria-hidden="true"><span /><span /><span /></span><span>Menu</span></summary>
            <div className="mobile-menu-panel">
              {mainNavigation.map(group => <details key={group.id}>
                <summary>{group.label}</summary>
                <div className="mobile-submenu">
                  <button type="button" onClick={() => openPage(group.id)}>Overzicht {group.label}</button>
                  {group.children.map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}
                </div>
              </details>)}
              <button type="button" onClick={() => openPage('tarieven')}>Tarieven</button>
              <button type="button" onClick={() => openPage('contact')}>Contact</button>
              <button type="button" onClick={openLogin}>{state.loggedIn ? 'Mijn account' : 'Inloggen'}</button>
              {isBooking ? <span className="mobile-book mobile-current">U maakt een afspraak</span> : <button type="button" className="mobile-book" onClick={startBooking}>Afspraak maken</button>}
            </div>
          </details>
        </nav>
      </header>}

      {state.screen === 'confirmation' ? (
        <main className="confirmation-screen" ref={bookingRef} tabIndex={-1}>
          <div className="confirmation-full-card" role="status">
            <span className="confirmation-symbol" aria-hidden="true">✓</span>
            <p className="eyebrow">Uw oefenafspraak</p>
            <h1>Uw afspraak is geboekt</h1>
            <p className="confirmation-lead">U heeft een afspraak voor {state.service?.toLowerCase()} gemaakt.</p>
            <dl className="confirmation-details"><div><dt>Afspraak</dt><dd>{state.service}</dd></div><div><dt>Datum</dt><dd>{state.date && formatDate(state.date)}</dd></div><div><dt>Tijd</dt><dd>{state.time} uur</dd></div></dl>
            <p>Dit is een fictieve oefenomgeving. Er wordt geen echte afspraak gemaakt.</p>
            <div className="confirmation-actions"><button type="button" className="site-primary" onClick={openHome}>Terug naar home</button>
              <button type="button" className="change-booking" onClick={() => navigate({ type: 'CHANGE_BOOKING' })}>Afspraak wijzigen</button></div>
          </div>
        </main>
      ) : state.screen === 'home' ? (
        <main className="site-main" ref={bookingRef}>
          <section className="home-main" aria-labelledby="home-title">
            <div className="home-panel">
              <p className="eyebrow">Welkom bij de oefenpraktijk</p>
              <h1 id="home-title">Samen in beweging</h1>
              <p className="home-intro">Persoonlijke aandacht voor bewegen en dagelijks leven. Ontdek ons fictieve zorgaanbod of plan direct een oefenafspraak.</p>
              <div className="home-actions">
                <button type="button" className="home-action" onClick={startBooking}>Afspraak maken <span aria-hidden="true">→</span></button>
                <button type="button" className="home-action" onClick={() => navigate({ type: 'OPEN_PROFILE' })}>Uw gegevens <span aria-hidden="true">→</span></button>
                <button type="button" className="home-action" onClick={openLogin}>Inloggen <span aria-hidden="true">→</span></button>
              </div>
            </div>
          </section>
          <section className="site-section" aria-labelledby="care-title">
            <div className="section-heading"><div><p className="eyebrow">Ons aanbod</p><h2 id="care-title">Welke zorg zoekt u?</h2></div><p>Van een eerste gesprek tot begeleiding bij bewegen: verken de verschillende ingangen.</p></div>
            <div className="site-card-grid">
              {mainNavigation.slice(0, 5).map((group, index) => <button type="button" className="site-card" key={group.id} onClick={() => openPage(group.id)}>
                <span className={`site-card-image site-card-image-${index}`} aria-hidden="true" />
                <span className="site-card-body"><strong>{group.label}</strong><span>{pageById[group.id].intro}</span><em>Meer informatie <span aria-hidden="true">→</span></em></span>
              </button>)}
            </div>
          </section>
          <section className="feature-band">
            <img src="/images/groep-bewegen.webp" alt="Diverse groep doet zittende beweegoefeningen" />
            <div><p className="eyebrow">Verdieping</p><h2>Vind uw weg in ons aanbod</h2><p>Naast de zorggebieden vindt u specialisaties en themapagina’s. Zo kunt u via verschillende routes informatie vinden.</p><button type="button" className="text-link" onClick={() => openPage('expertisecentra')}>Bekijk de expertisecentra <span aria-hidden="true">→</span></button></div>
          </section>
          <section className="site-section practical-section"><div className="section-heading"><div><p className="eyebrow">Goed om te weten</p><h2>Praktische informatie</h2></div></div>
            <div className="quick-links">{['tarieven', 'locaties', 'veelgestelde-vragen', 'contact'].map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}<span aria-hidden="true">→</span></button>)}</div>
          </section>
          <section className="site-section discovery-section" aria-labelledby="discovery-title">
            <div className="section-heading"><div><p className="eyebrow">Verder ontdekken</p><h2 id="discovery-title">Meer op deze site</h2></div><p>Een grotere praktijksite heeft ook verhalen, achtergrondinformatie en praktische antwoorden.</p></div>
            <div className="site-card-grid">
              {([
                { id: 'nieuws', image: '/images/groep-bewegen.webp', label: 'Nieuws en bijeenkomsten' },
                { id: 'team', image: '/images/gesprek-therapie.webp', label: 'Maak kennis met het team' },
                { id: 'veelgestelde-vragen', image: '/images/dagelijks-bewegen.webp', label: 'Veelgestelde vragen' },
              ] as const).map(item => <button type="button" className="site-card discovery-card" key={item.id} onClick={() => openPage(item.id)}>
                <img src={item.image} alt="" loading="lazy" />
                <span className="site-card-body"><strong>{item.label}</strong><span>{pageById[item.id].intro}</span><em>Bekijk de pagina <span aria-hidden="true">→</span></em></span>
              </button>)}
            </div>
          </section>
        </main>
      ) : state.screen === 'search' ? (
        <main className="site-main search-page" ref={bookingRef} tabIndex={-1}>
          <div className="search-page-inner"><p className="eyebrow">Zoeken op de site</p><h1>Zoekresultaten</h1>
            <p>{submittedSearch ? `Resultaten voor “${submittedSearch}”` : 'Typ een zoekterm in de zoekbalk hierboven.'}</p>
            {submittedSearch && <div className="search-results">{searchPages(submittedSearch).length ? searchPages(submittedSearch).map(result =>
              <button type="button" className="search-result" key={result.id} onClick={() => openPage(result.id)}>
                <span>{result.category}</span><strong>{result.title}</strong><span>{result.intro}</span><em>Bekijk de pagina →</em>
              </button>) : <p role="status">Geen resultaten gevonden. Probeer een andere zoekterm.</p>}</div>}
          </div>
        </main>
      ) : state.screen === 'login' || state.screen === 'account' ? (
        <main className="login-page" ref={bookingRef} tabIndex={-1}>
          <div className="login-card"><p className="eyebrow">Fictieve oefenomgeving</p>
            {state.screen === 'account' ? <><h1>Welkom, Alex Voorbeeld</h1><p>U bent ingelogd in het voorbeeldaccount. Er zijn geen echte gegevens opgehaald of verstuurd.</p>
              <div className="profile-details"><span>E-mailadres</span><strong>{FAKE_LOGIN_EMAIL}</strong></div>
              <button type="button" className="action-button" onClick={() => navigate({ type: 'LOGOUT' })}>Uitloggen</button></> : <>
              <h1>Inloggen</h1><p>Gebruik het fictieve e-mailadres dat u van de onderzoeker heeft gekregen.</p>
              <form className="login-form" onSubmit={submitLogin} noValidate>
                <label htmlFor="login-email">E-mailadres</label><input id="login-email" type="email" autoComplete="off" inputMode="email" value={loginEmail}
                  onChange={event => { setLoginEmail(event.target.value); setLoginError(''); }} placeholder="naam@voorbeeld.invalid" required />
                {loginError && <p className="validation" role="alert">{loginError}</p>}
                <button type="submit" className="site-primary">Inloggen</button>
              </form>
              <p className="login-note">Dit is een oefenlogin. Gebruik geen persoonlijk e-mailadres.</p>
            </>}
          </div>
        </main>
      ) : state.screen === 'profile' ? (
        <main className="booking-main" ref={bookingRef} tabIndex={-1}>
          <section className="booking-hero" aria-label="Uw gegevens"><div><nav className="breadcrumbs" aria-label="Kruimelpad"><button type="button" onClick={openHome}>Home</button><span aria-hidden="true">/</span><span aria-current="page">Uw gegevens</span></nav><p className="eyebrow">Fysiotherapie Valkenswaard</p><p className="booking-hero-title">Uw gegevens</p><p>Bekijk de voorbeeldgegevens in deze oefenomgeving.</p></div><img src="/images/praktijk.png" alt="Ontvangstruimte van de fictieve praktijk" /></section>
          <div className="profile-layout"><div className="content-panel profile-panel">
            <p className="eyebrow">Uw gegevens</p>
            <h1>Uw gegevens</h1>
            <p>Dit zijn fictieve gegevens voor deze oefenomgeving.</p>
            <div className="profile-details"><span>Naam</span><strong>Alex Voorbeeld</strong></div>
            <button type="button" className="action-button" onClick={() => navigate({ type: 'CLOSE_PROFILE' })}>Terug naar start</button>
          </div></div>
        </main>
      ) : state.screen === 'info' && page ? (
        <main className="site-main" ref={bookingRef} tabIndex={-1}>
          <div className="site-page-hero">
            <div className="site-page-hero-inner">
              <nav className="breadcrumbs" aria-label="Kruimelpad">
                <button type="button" onClick={openHome}>Home</button><span aria-hidden="true">/</span>
                {page.parent && <><button type="button" onClick={() => openPage(page.parent!)}>{pageById[page.parent].title}</button><span aria-hidden="true">/</span></>}
                <span aria-current="page">{page.title}</span>
              </nav>
              <p className="eyebrow">{page.category}</p><h1>{page.title}</h1><p>{page.intro}</p>
              <button type="button" className="site-primary" onClick={startBooking}>Afspraak maken <span aria-hidden="true">→</span></button>
            </div>
            {page.image && <img src={page.image} alt="Sfeerbeeld van de fictieve praktijk" />}
          </div>
          <div className="site-page-layout">
            <div className="site-page-copy">{page.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
            <aside className="site-page-aside"><h2>Verder kijken</h2><p>Bekijk verwante onderwerpen of keer terug naar het overzicht.</p>
              {(page.links || []).map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}<span aria-hidden="true">→</span></button>)}
              <button type="button" onClick={openHome}>Terug naar home<span aria-hidden="true">→</span></button>
            </aside>
          </div>
        </main>
      ) : (
        <main className="booking-main" ref={bookingRef} tabIndex={-1}>
          <section className="booking-hero" aria-label="Afspraak maken">
            <div><nav className="breadcrumbs" aria-label="Kruimelpad"><button type="button" onClick={openHome}>Home</button><span aria-hidden="true">/</span><span aria-current="page">Afspraak maken</span></nav>
              <p className="eyebrow">Fysiotherapie Valkenswaard</p><p className="booking-hero-title">Afspraak maken</p><p>Plan hier een fictieve afspraak in een paar duidelijke stappen.</p></div>
            <img src="/images/therapie-hero.png" alt="Fysiotherapeut begeleidt een oudere patiënt" />
          </section>
          <div className="booking-layout"><div className="content-panel">
            <p className="step-indicator">Stap {stepNumber[state.screen]} van 4</p>
            <h1>{TITLES[state.screen]}</h1>

            {state.screen === 'service' && <>
              <p className="instruction">Kies de afspraak die bij uw vraag past.</p>
              <div className="service-grid" role="radiogroup" aria-label="Soort afspraak">
                {SERVICES.map(service => <ServiceCard key={service} service={service} selected={state.service === service} onClick={() => dispatch({ type: 'SELECT_SERVICE', service })} />)}
              </div>
            </>}

            {state.screen === 'date' && <>
              <p className="instruction">Selecteer een beschikbare datum.</p>
              <Calendar initialMonth={scenario.initialMonth} selected={state.date} onSelect={date => dispatch({ type: 'SELECT_DATE', date })} />
            </>}

            {state.screen === 'time' && <>
              <p className="instruction">Selecteer de tijd die u het beste uitkomt.</p>
              <div className="time-grid" role="radiogroup" aria-label="Tijd">
                {TIMES.map(time => <ChoiceCard key={time} label={`${time} uur`} selected={state.time === time} onClick={() => dispatch({ type: 'SELECT_TIME', time })} />)}
              </div>
            </>}

            {state.screen === 'review' && <>
              <p className="instruction">Klopt alles? Bevestig dan uw afspraak.</p>
              <div className="review-list">
                <div className="review-row"><div><span>Afspraak</span><strong>{state.service}</strong></div><button type="button" onClick={() => navigate({ type: 'EDIT', screen: 'service' })}>Wijzigen</button></div>
                <div className="review-row"><div><span>Datum</span><strong>{state.date && formatDate(state.date)}</strong></div><button type="button" onClick={() => navigate({ type: 'EDIT', screen: 'date' })}>Wijzigen</button></div>
                <div className="review-row"><div><span>Tijd</span><strong>{state.time} uur</strong></div><button type="button" onClick={() => navigate({ type: 'EDIT', screen: 'time' })}>Wijzigen</button></div>
              </div>
            </>}

            {state.validation && <p className="validation" role="alert">{state.validation}</p>}
            {state.screen === 'review' ? (
              <div className="confirm-area">
                <button type="button" className="action-button confirm-button" onClick={() => navigate({ type: 'CONFIRM' })}>Afspraak bevestigen</button>
              </div>
            ) : null}
            <Navigation
              visible={variant.visibleNavigation} open={state.menuOpen} review={state.screen === 'review'}
              onToggle={() => dispatch({ type: 'TOGGLE_MENU' })}
              onBack={() => navigate({ type: 'BACK' })}
              onNext={() => navigate({ type: 'NEXT' })}
            />
          </div><aside className="booking-aside"><img src="/images/praktijk.png" alt="Ontvangstruimte van de fictieve praktijk" /><div><p className="eyebrow">Uw afspraak</p><h2>Overzicht</h2>
            <dl><div><dt>Soort afspraak</dt><dd>{state.service || 'Nog niet gekozen'}</dd></div><div><dt>Datum</dt><dd>{state.date ? formatDate(state.date) : 'Nog niet gekozen'}</dd></div><div><dt>Tijd</dt><dd>{state.time ? `${state.time} uur` : 'Nog niet gekozen'}</dd></div></dl>
            <p>Dit is een oefenomgeving. Er wordt geen echte afspraak gemaakt.</p></div></aside></div>
        </main>
      )}
      {state.screen !== 'confirmation' && <footer className="site-footer rich-footer"><div className="footer-inner">
        <div><strong>Fysiotherapie Valkenswaard</strong><p>Fictieve praktijk voor een gebruiksonderzoek. Er wordt geen echte afspraak gemaakt.</p></div>
        <div><strong>Zorgaanbod</strong>{mainNavigation.slice(0, 5).map(group => <button type="button" key={group.id} onClick={() => openPage(group.id)}>{group.label}</button>)}</div>
        <div><strong>Praktisch</strong>{['tarieven', 'locaties', 'contact', 'veelgestelde-vragen'].map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}</div>
        <div><strong>Meer</strong>{['over-ons', 'werken-bij', 'nieuws', 'privacy', 'voorwaarden'].map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}</div>
      </div></footer>}
      {loading && <LoadingScreen skeleton={variant.skeletonLoading} />}
    </div>
  );
}
