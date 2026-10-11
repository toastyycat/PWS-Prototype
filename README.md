# Accessible booking UI for older adults

*Nederlandse samenvatting en sessiehandleiding: [HANDLEIDING.md](HANDLEIDING.md).*

This repository contains the test prototype from a Dutch secondary-school research project (profielwerkstuk, VWO). The study asks:

> How can text size, navigation, contrast and loading feedback help adults aged 65+ with little digital experience book an appointment on their own, with as little frustration and uncertainty as possible?

Participants book fictional appointments at a fictional physiotherapy practice on a smartphone. The researcher switches individual design features on or off and compares how fast, how independently and how comfortably participants complete each booking.

We had only a small number of participants ourselves, so we are publishing the prototype and the protocol. **Anyone may run the same study** and share their (anonymised) results. Everything you need is in this repository.

## What is being tested

The study compares four design features:

| # | Feature | Feature left out | Feature on |
|---|---|---|---|
| 1 | Text size | 16 px base text | 24 px base text and larger headings |
| 2 | Clear navigation | *Back* and *Next* hidden behind a *Menu* button | *Back* and *Next* always visible |
| 3 | Contrast | All text and controls below a 4.5:1 contrast ratio | Contrast of at least 4.5:1 |
| 6 | Loading screen | Current page stays unchanged during the 1.4 s wait | Skeleton of the next page during the 1.4 s wait |

Each comparison is an A/B pair. **Variant B is the complete design, with all four features on. Variant A is the same design with exactly one feature left out**: the one being tested. So every task shows an almost complete design, and the difference between A and B isolates what that single feature adds. Each screen transition waits 1.4 seconds in every variant, so only the feedback during the wait differs.

## How we ran the original study

- **Smartphone only.** All sessions took place on a smartphone.
- **Four comparisons**: text size, clear navigation, contrast and loading screen, each with one feature left out in variant A.
- **Dropped**: the micro-interactions (animation) comparison was not part of the final study.
- Each booking task names a service, date and time ("Make an appointment for an intake on Tuesday 6 October 2026 at 10:30"). Different targets (X, Y, Z, W) within a comparison prevent learning effects, and both tasks in a pair use the same month.
- Screen recordings of the phone and the researchers' notes were the main sources for errors, hesitations and remarks.

The paper with the full method and results will be linked here once it is finished.

### What else the prototype can do

The prototype supports more than we used. You can use these options to extend the study, but say so when you report results:

- a **micro-interactions** comparison (4): screen and element animations, hover and press feedback;
- a **full design** comparison (5): all features off against all features on;
- a **desktop** group: codes D01–D100 are pre-scheduled for 51 smartphone and 49 desktop participants;
- **information tasks** (I1–I4) and a **login task** (I5) with the fictional address `alex.voorbeeld@example.invalid`, as exploratory extras.

The participant route (`/deelnemer`) follows the built-in roster in [`public/deelnemers.csv`](public/deelnemers.csv), which still schedules all six comparisons plus the three extra tasks: 15 tasks per code, in rotating order. A code always runs all 15 tasks. To repeat only our four comparisons, change `src/shared/roster.ts`, run `npm run roster` and check the new CSV before use.

## What is measured

Per task:

- **Time on task** in seconds, from the moment the home screen appears until the booking is correctly confirmed. The app records this automatically; you can also measure it from the screen recording.
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
- Record everything else in the templates in [`templates/`](templates/): one row per task in `sessieregistratie.csv` and one row per participant in `deelnemers-achtergrond.csv`. Use participant codes only, never names. The column definitions are in [`templates/README.md`](templates/README.md).
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
