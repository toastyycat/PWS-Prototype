# Accessible booking UI for older adults

*Nederlandse samenvatting en sessiehandleiding: [HANDLEIDING.md](HANDLEIDING.md).*

This repository contains the test prototype from a Dutch secondary-school research project (profielwerkstuk, VWO). The study asks:

> How can text size, navigation, contrast, micro-interactions and loading feedback help adults aged 65+ with little digital experience book an appointment on their own, with as little frustration and uncertainty as possible?

Participants book fictional appointments at a fictional physiotherapy practice. The researcher switches individual design features on or off and compares how fast, how independently and how comfortably participants complete each booking.

We had only a small number of participants ourselves, so we are publishing the prototype and the protocol. **Anyone may run the same study** and share their (anonymised) results. Everything you need is in this repository.

## What is being tested

The prototype implements five design features. Each can be switched on or off independently:

| # | Feature | Off (A) | On (B) |
|---|---|---|---|
| 1 | Text size | 16 px base text | 24 px base text and larger headings |
| 2 | Navigation | *Back* and *Next* hidden behind a *Menu* button | *Back* and *Next* always visible |
| 3 | Contrast | All text and controls below a 4.5:1 contrast ratio | Contrast of at least 4.5:1 |
| 4 | Micro-interactions | No animation, hover or press feedback | Screen and element animations, hover/press feedback, colour transitions |
| 6 | Loading feedback | Current page stays unchanged during the 1.4 s wait | Skeleton of the next page during the 1.4 s wait |

Comparison 5 sets *all* features off against *all* features on.

For the single-feature comparisons (1, 2, 3, 4 and 6), variant B has every feature on and variant A has every feature on **except the one being tested**. Each screen transition waits 1.4 seconds in every variant, so only the feedback differs.

### Session structure

Every participant does 15 tasks in a fixed, counterbalanced order (see [`public/deelnemers.csv`](public/deelnemers.csv)):

- **12 booking tasks**: six A/B pairs, one pair per comparison. Each task names a service, date and time ("Make an appointment for an intake on Tuesday 6 October 2026 at 10:30"). Four different targets (X, Y, Z, W) per comparison prevent learning effects, and both tasks in a pair use the same month.
- **2 information tasks** (I1–I4): find a fact on the practice website. These are exploratory and not part of the A/B comparison.
- **1 login task** (I5): log in with the fictional address `alex.voorbeeld@example.invalid`. Also exploratory.

Codes D01–D100 are pre-scheduled: 51 for smartphone and 49 for desktop. Comparison order and A/B order rotate between participants.

### What is measured

Per task:

- **Time on task** in seconds, recorded automatically from the moment the home screen appears until the booking is correctly confirmed.
- **Success**: completed independently within 3 minutes, yes or no.
- **Errors**: wrong service, date or time, a wrong booking step, or an unnecessary or repeated confirmation. Opening the menu or scrolling is not an error.
- **Frustration** and **uncertainty**, each on a 1–5 scale, asked right after the task.
- **Observations**: think-aloud remarks and where the participant hesitated.

Per participant: age, smartphone and internet use, prior experience with online booking, aids (glasses, zoom), and a short debrief.

## Quick start

You need [Node.js](https://nodejs.org/) 22.6 or newer.

```bash
git clone https://github.com/toastyycat/PWS-Prototype.git
cd PWS-Prototype
npm ci
npm test          # protocol, roster and variant checks
npm run build
npm run preview   # http://localhost:4310, also reachable on your local network
```

Use `npm run dev` during development. Always run the app through Vite (`preview` or `dev`): a plain static file server cannot save task durations and returns 404 on direct links.

| Route | Purpose |
|---|---|
| `/deelnemer` | Participant session: enter a code (1–100) and the 15 tasks run in order. |
| `/onderzoek` | Researcher overview: roster, CSV downloads, printable task cards. |
| `/print/opdrachten` | Printable task cards for every participant. |
| `/` | Demo: switch features and tasks freely to try the prototype. |

The interface, the tasks and the website content are in Dutch, because the original participants were Dutch. To run the study in another language, translate `src/participant/siteContent.ts`, the task texts in `src/shared/protocol.ts` and the task cards.

## Running a session

1. **Recruit** adults aged 65+, preferably with little digital experience. Explain that the website is being tested, not the person, that the appointment is fake, and that they can stop at any time.
2. **Get written consent** for participation and, separately, for screen recording and for face or voice recording. A template is in [`templates/toestemmingsformulier.md`](templates/toestemmingsformulier.md).
3. **Prepare devices.** Run the app on a laptop. Connect the test phone or second computer to the same Wi-Fi network (or a hotspot) and open the *Network* address that Vite prints, followed by `/deelnemer`. Keep the laptop awake: durations are saved there.
4. **Print** the participant's task cards from `/print/opdrachten` and the registration sheet.
5. **During the session**, one person reads the task aloud and asks the questions, and a second person records observations. Read each task *before* pressing *Start sessie* or *Verder naar TXX*, because the timer starts when the home screen appears. Give no hints. After 3 minutes, or when the participant gives up, the task counts as not completed.
6. **After each task**, ask the two 1–5 questions: *How much frustration did you feel?* and *How uncertain did you feel about what to do, or whether it worked?*
7. **Afterwards**, download `taakduren.csv` from `/onderzoek` and hold a short debrief.

The full step-by-step script, with the exact Dutch wording and the error rules, is in [HANDLEIDING.md](HANDLEIDING.md).

## Data and privacy

- The app stores only `participant code; task; duration in seconds` in `data/taakduren.csv`, on the researcher's laptop. Set `PWS_RESULTS_DIR` to store it elsewhere. The `data/` folder is never committed to Git.
- Record everything else in the templates in [`templates/`](templates/): one row per task in `sessieregistratie.csv` and one row per participant in `deelnemers-achtergrond.csv`. Use participant codes only, never names.
- Screen recordings can show faces or voices. Store them outside cloud-synced folders, keep the link between names and codes separate, and delete everything after the retention period agreed in the consent form.
- No real health data, accounts, passwords or appointments are involved. All people, places and content on the practice website are fictional.

**This repository contains no participant data.**

## Sharing your results

If you run the study, we would like to hear about it. Open an issue with:

- the number of participants per device group, and their age range;
- the anonymised `taakduren.csv`, `sessieregistratie.csv` and `deelnemers-achtergrond.csv`;
- the commit hash of the prototype you used, and any changes you made to the protocol.

Report results per device group, using only valid paired observations. A technical failure makes a task invalid; do not count it as a participant error.

## Repository layout

| Path | Contents |
|---|---|
| `src/participant/` | The fictional practice website and booking flow. |
| `src/researcher/` | Researcher overview and task-card printing. |
| `src/shared/protocol.ts` | Variants, booking targets, information tasks and expected answers. |
| `src/shared/roster.ts`, `scripts/generate-roster.mjs` | Counterbalanced roster; `npm run roster` regenerates `public/deelnemers.csv`. |
| `server/taskCsv.ts` | Vite plugin that saves task durations. |
| `scripts/illustrator/` | Illustrator script that turns the roster into A4 task cards. |
| `templates/` | Consent form and registration templates. |
| `docs/` | Method of the original study (Dutch, Word). |
| `INHOUD_EN_TESTROUTES.md` | Routes, tasks and site structure (Dutch). |
| `AGENTS.md` | Original build brief for the prototype (Dutch). |

## Known limitations

- Information tasks finish when the participant presses *Ik heb het antwoord gevonden*, but that button only appears on the correct page, which can give away that the participant is in the right place.
- There is no button to abort a task. If a participant gives up or reaches the 3-minute limit, the researcher completes the task, and its recorded time is not valid.
- The participant route has a fixed 100 % zoom. If a participant needs larger text, use the phone's own zoom and keep it the same for the whole session.
- The extended registration panel in `/onderzoek` (consent, device pairing, observations) is a front-end example and is not connected.

## License

The source code is available under the [MIT License](LICENSE). The method documents, task texts and templates may be reused under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The images in `public/images/` were generated for this prototype; see `INHOUD_EN_TESTROUTES.md` for the prompts.
