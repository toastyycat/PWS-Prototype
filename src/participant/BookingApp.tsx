import { useEffect, useReducer, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { Scenario, Service, Time, VariantConfig } from '../shared/protocol';
import { formatDate, SERVICES, TIMES } from '../shared/protocol';
import { mainNavigation, pageById } from './siteContent';

type Screen = 'home' | 'info' | 'profile' | 'service' | 'date' | 'time' | 'review' | 'confirmation';
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
}

type Action =
  | { type: 'OPEN_BOOKING' | 'OPEN_HOME' | 'OPEN_PROFILE' | 'CLOSE_PROFILE' | 'TOGGLE_MENU' | 'BACK' | 'NEXT' | 'CONFIRM' | 'CHANGE_BOOKING' }
  | { type: 'OPEN_PAGE'; pageId: string }
  | { type: 'NAVIGATE'; screen: 'home' | 'info'; pageId: string | null }
  | { type: 'SELECT_SERVICE'; service: Service }
  | { type: 'SELECT_DATE'; date: string }
  | { type: 'SELECT_TIME'; time: Time }
  | { type: 'EDIT'; screen: ChoiceScreen };

function readSiteRoute(): { screen: 'home' | 'info'; pageId: string | null } {
  const match = window.location.pathname.match(/^\/informatie\/([a-z0-9-]+)\/?$/);
  return match && pageById[match[1]] ? { screen: 'info', pageId: match[1] } : { screen: 'home', pageId: null };
}

const initialRoute = readSiteRoute();
const initialState: BookingState = {
  screen: initialRoute.screen, pageId: initialRoute.pageId, profileReturn: 'home', service: null, date: null, time: null,
  editReturn: false, menuOpen: false, validation: '',
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'NAVIGATE': return { ...state, screen: action.screen, pageId: action.pageId, menuOpen: false, validation: '' };
    case 'OPEN_HOME': return { ...state, screen: 'home', pageId: null, menuOpen: false, validation: '' };
    case 'OPEN_PAGE': return { ...state, screen: 'info', pageId: action.pageId, menuOpen: false, validation: '' };
    case 'OPEN_BOOKING': return { ...state, screen: 'service', menuOpen: false, validation: '' };
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

const TITLES: Record<Exclude<Screen, 'home' | 'profile'>, string> = {
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
  Oefentherapie: { description: 'Samen oefenen om makkelijker te bewegen.', image: '/images/bewegen.png' },
  'Manuele therapie': { description: 'Aandacht voor het bewegen van gewrichten.', image: '/images/manuele-therapie.png' },
  Sportfysiotherapie: { description: 'Begeleiding bij terugkeer naar sport en bewegen.', image: '/images/sportfysiotherapie.png' },
  Ergotherapie: { description: 'Ondersteuning bij dagelijkse handelingen.', image: '/images/ergotherapie.png' },
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

function Calendar({ available, selected, onSelect }: { available: readonly string[]; selected: string | null; onSelect: (date: string) => void }) {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - 2;
    return day >= 1 && day <= 31 ? `2026-10-${String(day).padStart(2, '0')}` : null;
  });
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: string) => {
    const increment: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(event.key in increment)) return;
    event.preventDefault();
    const day = Number(date.slice(-2));
    let next = day + increment[event.key];
    while (next >= 1 && next <= 31) {
      const key = `2026-10-${String(next).padStart(2, '0')}`;
      if (available.includes(key)) { buttonRefs.current[key]?.focus(); return; }
      next += increment[event.key];
    }
  };
  return (
    <div className="calendar" aria-label="Beschikbare dagen in oktober 2026">
      <h2 className="calendar-title">Oktober 2026</h2>
      <div className="calendar-grid" role="grid" aria-label="Oktober 2026">
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(day => <span className="weekday" key={day} role="columnheader">{day}</span>)}
        {cells.map((date, index) => {
          const active = Boolean(date && available.includes(date));
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

export function BookingApp({ scenario, variant, scale }: { scenario: Scenario; variant: VariantConfig; scale: number }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const bookingRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handlePopState = () => dispatch({ type: 'NAVIGATE', ...readSiteRoute() });
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
    variant.emphasizedAction ? 'has-emphasized-action' : '',
  ].filter(Boolean).join(' ');
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = variant.animatedConfirmation && !reducedMotion;
  const stepNumber: Partial<Record<Screen, number>> = { service: 1, date: 2, time: 3, review: 4 };
  const isSitePage = state.screen === 'home' || state.screen === 'info' || state.screen === 'profile';
  const isBooking = !isSitePage;
  const openPage = (pageId: string) => {
    if (window.location.pathname !== `/informatie/${pageId}`) window.history.pushState(null, '', `/informatie/${pageId}${window.location.search}`);
    dispatch({ type: 'OPEN_PAGE', pageId });
  };
  const openHome = () => {
    if (window.location.pathname !== '/') window.history.pushState(null, '', `/${window.location.search}`);
    dispatch({ type: 'OPEN_HOME' });
  };
  const startBooking = () => {
    if (window.location.pathname !== '/') window.history.pushState(null, '', `/${window.location.search}`);
    dispatch({ type: 'OPEN_BOOKING' });
  };
  const page = state.pageId ? pageById[state.pageId] : null;

  return (
    <div className={rootClass} style={{ '--text-scale': scale / 100 } as React.CSSProperties}>
      <header className="site-header">
        <div className="site-header-inner">
          <button type="button" className="brand brand-button" onClick={openHome}>Fysiotherapie<span className="brand-place"> Valkenswaard</span></button>
          <span className="environment-label">Fictieve oefenomgeving</span>
        </div>
        <nav className="site-nav" aria-label="Hoofdnavigatie" key={`${state.screen}-${state.pageId}`}>
          <div className="site-nav-inner">
            {mainNavigation.map(group => <details className="nav-group" key={group.id}>
              <summary>{group.label}</summary>
              <div className="nav-dropdown">
                <button type="button" className="nav-parent" onClick={() => openPage(group.id)}>Overzicht {group.label} <span aria-hidden="true">→</span></button>
                {group.children.map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}
              </div>
            </details>)}
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
              {isBooking ? <span className="mobile-book mobile-current">U maakt een afspraak</span> : <button type="button" className="mobile-book" onClick={startBooking}>Afspraak maken</button>}
            </div>
          </details>
        </nav>
      </header>

      {state.screen === 'home' ? (
        <main className="site-main">
          <section className="home-main" aria-labelledby="home-title">
            <div className="home-panel">
              <p className="eyebrow">Welkom bij de oefenpraktijk</p>
              <h1 id="home-title">Samen in beweging</h1>
              <p className="home-intro">Persoonlijke aandacht voor bewegen en dagelijks leven. Ontdek ons fictieve zorgaanbod of plan direct een oefenafspraak.</p>
              <div className="home-actions">
                <button type="button" className="home-action" onClick={startBooking}>Afspraak maken <span aria-hidden="true">→</span></button>
                <button type="button" className="home-action" onClick={() => dispatch({ type: 'OPEN_PROFILE' })}>Uw gegevens <span aria-hidden="true">→</span></button>
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
            <img src="/images/bewegen.png" alt="Oudere vrouw oefent samen met een fysiotherapeut" />
            <div><p className="eyebrow">Verdieping</p><h2>Vind uw weg in ons aanbod</h2><p>Naast de zorggebieden vindt u specialisaties en themapagina’s. Zo kunt u via verschillende routes informatie vinden.</p><button type="button" className="text-link" onClick={() => openPage('expertisecentra')}>Bekijk de expertisecentra <span aria-hidden="true">→</span></button></div>
          </section>
          <section className="site-section practical-section"><div className="section-heading"><div><p className="eyebrow">Goed om te weten</p><h2>Praktische informatie</h2></div></div>
            <div className="quick-links">{['tarieven', 'locaties', 'veelgestelde-vragen', 'contact'].map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}<span aria-hidden="true">→</span></button>)}</div>
          </section>
        </main>
      ) : state.screen === 'profile' ? (
        <main className="booking-main" ref={bookingRef} tabIndex={-1}>
          <section className="booking-hero" aria-label="Uw gegevens"><div><nav className="breadcrumbs" aria-label="Kruimelpad"><button type="button" onClick={openHome}>Home</button><span aria-hidden="true">/</span><span aria-current="page">Uw gegevens</span></nav><p className="eyebrow">Fysiotherapie Valkenswaard</p><p className="booking-hero-title">Uw gegevens</p><p>Bekijk de voorbeeldgegevens in deze oefenomgeving.</p></div><img src="/images/praktijk.png" alt="Ontvangstruimte van de fictieve praktijk" /></section>
          <div className="profile-layout"><div className="content-panel profile-panel">
            <p className="eyebrow">Uw gegevens</p>
            <h1>Uw gegevens</h1>
            <p>Dit zijn fictieve gegevens voor deze oefenomgeving.</p>
            <div className="profile-details"><span>Naam</span><strong>Alex Voorbeeld</strong></div>
            <button type="button" className="action-button" onClick={() => dispatch({ type: 'CLOSE_PROFILE' })}>Terug naar start</button>
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
            {state.screen !== 'confirmation' && <p className="step-indicator">Stap {stepNumber[state.screen]} van 4</p>}
            <h1>{TITLES[state.screen]}</h1>

            {state.screen === 'service' && <>
              <p className="instruction">Kies de afspraak die bij uw vraag past.</p>
              <div className="service-grid" role="radiogroup" aria-label="Soort afspraak">
                {SERVICES.map(service => <ServiceCard key={service} service={service} selected={state.service === service} onClick={() => dispatch({ type: 'SELECT_SERVICE', service })} />)}
              </div>
            </>}

            {state.screen === 'date' && <>
              <p className="instruction">Selecteer een beschikbare datum.</p>
              <Calendar available={scenario.dates} selected={state.date} onSelect={date => dispatch({ type: 'SELECT_DATE', date })} />
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
                <div className="review-row"><div><span>Afspraak</span><strong>{state.service}</strong></div><button type="button" onClick={() => dispatch({ type: 'EDIT', screen: 'service' })}>Wijzigen</button></div>
                <div className="review-row"><div><span>Datum</span><strong>{state.date && formatDate(state.date)}</strong></div><button type="button" onClick={() => dispatch({ type: 'EDIT', screen: 'date' })}>Wijzigen</button></div>
                <div className="review-row"><div><span>Tijd</span><strong>{state.time} uur</strong></div><button type="button" onClick={() => dispatch({ type: 'EDIT', screen: 'time' })}>Wijzigen</button></div>
              </div>
            </>}

            {state.screen === 'confirmation' && <>
              <div className={`confirmation-card ${canAnimate ? 'confirmation-animated' : ''}`} role="status">
                <span className="confirmation-symbol" aria-hidden="true">✓</span>
                <div><h2>Uw afspraak is geboekt</h2><p>{state.service} op {state.date && formatDate(state.date)} om {state.time} uur.</p></div>
              </div>
              <button type="button" className="change-booking" onClick={() => dispatch({ type: 'CHANGE_BOOKING' })}>Afspraak wijzigen</button>
            </>}

            {state.validation && <p className="validation" role="alert">{state.validation}</p>}
            {state.screen === 'review' || state.screen === 'confirmation' ? (
              <div className="confirm-area">
                <button type="button" className="action-button confirm-button" onClick={() => dispatch({ type: 'CONFIRM' })}>Afspraak bevestigen</button>
              </div>
            ) : null}
            {state.screen !== 'confirmation' && <Navigation
              visible={variant.visibleNavigation} open={state.menuOpen} review={state.screen === 'review'}
              onToggle={() => dispatch({ type: 'TOGGLE_MENU' })}
              onBack={() => dispatch({ type: 'BACK' })}
              onNext={() => dispatch({ type: 'NEXT' })}
            />}
          </div><aside className="booking-aside"><img src="/images/praktijk.png" alt="Ontvangstruimte van de fictieve praktijk" /><div><p className="eyebrow">Uw afspraak</p><h2>Overzicht</h2>
            <dl><div><dt>Soort afspraak</dt><dd>{state.service || 'Nog niet gekozen'}</dd></div><div><dt>Datum</dt><dd>{state.date ? formatDate(state.date) : 'Nog niet gekozen'}</dd></div><div><dt>Tijd</dt><dd>{state.time ? `${state.time} uur` : 'Nog niet gekozen'}</dd></div></dl>
            <p>Dit is een oefenomgeving. Er wordt geen echte afspraak gemaakt.</p></div></aside></div>
        </main>
      )}
      <footer className="site-footer rich-footer"><div className="footer-inner">
        <div><strong>Fysiotherapie Valkenswaard</strong><p>Fictieve praktijk voor een gebruiksonderzoek. Er wordt geen echte afspraak gemaakt.</p></div>
        <div><strong>Zorgaanbod</strong>{mainNavigation.slice(0, 5).map(group => <button type="button" key={group.id} onClick={() => openPage(group.id)}>{group.label}</button>)}</div>
        <div><strong>Praktisch</strong>{['tarieven', 'locaties', 'contact', 'veelgestelde-vragen'].map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}</div>
        <div><strong>Meer</strong>{['over-ons', 'werken-bij', 'nieuws', 'privacy', 'voorwaarden'].map(id => <button type="button" key={id} onClick={() => openPage(id)}>{pageById[id].title}</button>)}</div>
      </div></footer>
    </div>
  );
}
