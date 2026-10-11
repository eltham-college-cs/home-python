# Python at Home: build specification

## 1. Purpose and audience

- **Students:** Years 7–9 who find programming hard. Short, confidence-building
  sessions of about 15 minutes, with instant feedback that matches CodeBash.
- **Parents:** may know no Python. Each page tells them exactly what to do.
- **Teacher (Mr Gordon):** adds one lesson by adding one folder. Records short
  screen videos and drops them in.

## 2. Site map and URLs

```
/                                   Home: choose your year, "This week" links
/parents/                           Start here, for parents (read once)
/year-7/                            Year overview: units and lessons in order
/year-7/python-basics/              Unit page (optional, lists its lessons)
/year-7/python-basics/lesson-3-input-and-conversion/
/year-8/ …   /year-9/ …
/error-decoder/                     Shared; filtered to the current year
/key-words/                         Shared glossary; tagged by year introduced
```

Base path: the site is served from `https://eltham-college-cs.github.io/home-python/`,
so set `site` and `base` in `astro.config.mjs` and use `import.meta.env.BASE_URL`
for every internal link and asset.

## 3. Repository layout

```
home-python/
├── CLAUDE.md
├── docs/SPEC.md
├── design/                         reference designs only, not built
├── astro.config.mjs
├── src/
│   ├── content.config.ts           collection schemas (zod)
│   ├── content/
│   │   ├── years/year-7.md         title, units in order, "this week" lesson
│   │   └── lessons/year-7/01-python-basics/03-input-and-conversion/
│   │       ├── index.mdx           page content
│   │       └── tasks.json          checker tests
│   ├── components/
│   │   ├── Yoka.astro              mascot, moods: idle | happy | tryagain
│   │   ├── PyChecker.astro         editor + Run + Check + results
│   │   ├── OutputDiff.astro        expected vs got, spaces as ·
│   │   ├── Celebrate.ts            particle burst
│   │   ├── InputFlow.astro         keyboard → input() → "15" → int() → 15
│   │   ├── TraceTable.astro        fills row by row
│   │   ├── SpotTheDifference.astro pairs of outputs with reveal
│   │   ├── Parsons.astro           drag lines into order (keyboard accessible)
│   │   ├── QuizMe.astro            questions with reveal
│   │   ├── SelfRating.astro        not yet / sort of / yes
│   │   ├── LessonVideo.astro       see § 9
│   │   └── ParentTip.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro        header, nav, footer, theme by year
│   │   └── LessonLayout.astro      eyebrow, title, progress, sections
│   ├── styles/themes.css           year themes (§ 5)
│   ├── workers/pyodide.worker.ts
│   └── pages/ …
├── public/videos/year-7/ …         self-hosted clips, captions, posters
└── .github/workflows/deploy.yml
```

## 4. Content model

Lesson frontmatter (validate with zod in `content.config.ts`):

```yaml
---
year: 7
unit: Python basics
unitSlug: python-basics
lesson: 3
title: Input and conversion
summary: Today we teach the computer to listen, and to turn words into numbers.
minutes: 15
keywords: [input, int, str, TypeError, concatenation]
deck: https://slides.com/gig409/year-7-lesson-3-input-and-conversion
codebashTopic: Input, Output and Variables
videos:
  bigIdea:    { file: y7-l03-big-idea.mp4,    captions: y7-l03-big-idea.vtt }
  predictRun: { file: y7-l03-predict-run.mp4, captions: y7-l03-predict-run.vtt }
  fixBug:     { youtube: "" }               # empty = placeholder shown
draft: false
---
```

Order lessons by the numeric folder prefixes. `draft: true` pages build locally but
are excluded from production. The `keywords` field drives the glossary and the
error decoder filter.

`tasks.json`, the same shape as CodeBash test cases:

```json
{
  "tasks": [
    {
      "id": "hello-name",
      "title": "Hello, what's your name?",
      "starter": "name = input()\nprint(\"Hello,\", name + \"!\")",
      "tests": [
        { "input": "Susie", "output": "Hello, Susie!" }
      ],
      "hints": { "spaces": "…", "capitals": "…", "punctuation": "…" }
    }
  ]
}
```

`input` may contain several lines separated by `\n`, one per `input()` call.

## 5. Year themes

All years use Eltham navy and gold. Brightness, size and motion step down by year.
Set `data-year="7|8|9"` on `<body>` and define these tokens in `themes.css`.

| Token | Year 7 | Year 8 | Year 9 |
|---|---|---|---|
| `--navy` | #0A1B2E | #0A1B2E | #0A1B2E |
| `--navy-2` | #163351 | #163351 | #163351 |
| `--gold` | #F2B533 | #DDA93E | #C89B3C |
| `--gold-light` | #E3C783 | #E3C783 | #E3C783 |
| `--blue` | #1E5FA8 | #2A5A8C | #2A5A8C |
| `--page` | #FBFAF5 | #F7F8FA | #F7F8FA |
| `--panel` | #E8F3FD | #FFFFFF | #FFFFFF |
| `--border` | #D7E3EF | #D7E3EF | #D7E3EF |
| `--text` | #1A1D21 | #1A1D21 | #1A1D21 |
| `--muted` | #3A4654 | #555D68 | #555D68 |
| Display font | Fredoka 600 | Lexend 600 | Georgia 400 |
| Body font | Lexend | Lexend | Lexend |
| Code font | JetBrains Mono | JetBrains Mono | JetBrains Mono |
| Body size | 20px | 18px | 17px |
| H1 / H2 | 60 / 38px | 48 / 32px | 44 / 28px |
| Radius (cards) | 20–28px | 14–16px | 12px |
| Yoka | Header, feedback | Hint boxes only | None |
| Motion | Full | Light (trace rows) | None |

Feedback colours (all years): pass `#E6F4EC` / `#1F7A4D`, nearly `#FDF1D9` /
`#D9A21E`, error highlight `#FCE9E7` / `#B3261E`. Never use red for a failed test
in Year 7; use amber "nearly".

Self-host the Google Fonts (e.g. via `@fontsource`) so no third-party requests are made.

## 6. Lesson page structure

Same order on every page. Sections can be omitted per lesson.

1. Header: eyebrow (year, unit, lesson), H1, summary, progress, minutes.
   Year 7: Yoka (idle) with a speech bubble.
2. Parent tip strip.
3. **The big idea**: analogy in plain English + `InputFlow` or a diagram + video slot `bigIdea`.
4. **Predict, then run**: prediction box, `PyChecker`, video slot `predictRun`.
5. **How did it go?**: test results and Yoka feedback.
6. **Spot the difference / Match it exactly**: output-matching practice.
7. **Fix the bug**: broken code, checker, link to error decoder, video slot `fixBug`.
8. **Quiz me**: three questions, answers on reveal (parent asks).
9. **Self-rating**: stored in `localStorage` only, per lesson.

## 7. Checker (must match CodeBash)

Runs in `pyodide.worker.ts`. Load Pyodide once per page and keep the worker alive.

For each test:
1. Reset globals. Feed `test.input` lines to `input()` via `pyodide.setStdin`.
2. Capture stdout via `pyodide.setStdout` (batched).
3. Timeout 3 s: terminate and respawn the worker, show
   "Your program didn't finish. Is something repeating forever?"
4. Normalise both strings: convert `\r\n` to `\n`, remove one trailing newline.
5. Compare exactly.

**To confirm with Mr Gordon before finishing:** whether CodeBash includes the text
printed by `input("prompt")` in the compared output, and whether it ignores trailing
spaces on lines. Implement both as config flags (`includePrompts`, `trimLineEnds`)
in one place, defaulting to exact comparison.

Classify a failure in this order and show the matching hint:

| Check | Hint category |
|---|---|
| Equal after lowercasing | Capital letters |
| Equal after collapsing/removing spaces | Spaces |
| Equal after removing punctuation | Punctuation |
| Different number of lines | Extra or missing line |
| Python exception | Error, linked to the error decoder entry |
| Otherwise | "Compare your output with the expected output line by line." |

`OutputDiff` shows expected and got with spaces drawn as `·` (muted grey) and
differing characters highlighted. Unit-test the comparison and classification
with Vitest, including the lesson 3 TypeError and ValueError cases.

## 8. Yoka the mascot

Reference: `design/yoka-mascot.dc.html` and `design/yoka-moods.dc.html`.
Rebuild as an inline SVG in `Yoka.astro` with props `mood` and `size`.

| Mood | When | Face | Motion |
|---|---|---|---|
| `idle` | Page load, waiting | Open eyes, small smile | Blink every ~4 s, occasional tongue flick, gentle sway |
| `happy` | All tests pass | Closed happy eyes, cheeks, open grin, tongue | Bounce, nod, tail wag, sparkles |
| `tryagain` | Some tests fail | Determined brows, half smile | Nod, tail raised in a fist-pump |

Animate with CSS classes (not SMIL) so reduced motion can switch everything off.
Expose `setMood()` so `PyChecker` can change mood after a run. Particle burst
(`Celebrate.ts`) only when every test passes. Add `aria-live="polite"` to the
results message so screen readers announce it.

## 9. Videos

Mr Gordon records short screen videos and places them by slot name.

- Slots: `bigIdea`, `predictRun`, `fixBug` (more can be added).
  `<LessonVideo slot="predictRun" />` reads the lesson's `videos` frontmatter.
- **Self-hosted** (preferred for short clips): MP4 in
  `public/videos/year-N/`, with a `.vtt` captions file and a poster image of the
  same name (`y7-l03-predict-run.mp4/.vtt/.jpg`). Use `<video controls preload="none">`.
- **YouTube** (for longer clips): an unlisted video ID, embedded from
  `youtube-nocookie.com`, loaded only after the user presses play (facade).
- **Empty slot:** show a neat "Video coming soon" placeholder in development,
  and hide the slot entirely in production.
- Add a build-time check that warns if a referenced file is missing or over 50 MB.

## 10. Deployment

GitHub Actions: install, `npm test`, `npm run build`, deploy with the official
Pages action. Public repository. No secrets needed.

## 11. Build phases

1. Scaffold Astro, themes, layouts, header and nav for all three years.
2. Pyodide worker, `PyChecker`, `OutputDiff`, comparison logic with tests.
3. Yoka and feedback states, `Celebrate`.
4. Year 7 Lesson 3 page complete (content in this pack), matching
   `design/year-7-lesson.dc.html`.
5. Error decoder, key words, parents page, home page.
6. `LessonVideo` with placeholders.
7. Year 8 and Year 9 page variants matching their designs.

## 12. Done when

- Lesson 3 page matches the Year 7 design at desktop and phone width.
- The checker passes, fails and classifies the Lesson 3 tests correctly.
- Infinite loops time out without freezing the page.
- Reduced motion shows no animation; keyboard alone can complete the page.
- Lighthouse accessibility score 95 or above.
