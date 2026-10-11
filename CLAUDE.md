# Python at Home

A home-learning website for Eltham College students in Years 7–9 who find Python
difficult, and for their parents. Parents do not need to know Python: the site
gives them a clear role (read aloud, ask "what will happen?", check answers).

Read `docs/SPEC.md` before writing any code. It is the source of truth.
The `design/` folder holds the approved page designs as reference HTML:
match their colours, type, spacing and behaviour, but do not ship those files.

## Stack

- Astro (static output), TypeScript, content collections for lessons (MDX).
- Python runs in the browser with Pyodide inside a Web Worker. No server.
- Hosted on GitHub Pages from the `eltham-college-cs` organisation,
  deployed by GitHub Actions on push to `main`.

## Rules

- No student data leaves the browser. No analytics, no cookies, no accounts.
- Every animation respects `prefers-reduced-motion` (show the end state instead).
- Output checking must behave exactly like CodeBash (see SPEC § Checker).
- Pin every external script to an exact version. Pyodide is loaded from jsDelivr.
- British English in all copy. Sentence case for headings and buttons.
- Accessible: real buttons and labels, visible focus, text contrast at least 4.5:1,
  touch targets at least 44px, works at phone width.
- The mascot is called **Yoka** (a python). The component is `Yoka.astro`.

## Commands

- `npm run dev`: local preview
- `npm run build`: production build into `dist/`
- `npm run check`: Astro type check
- `npm test`: unit tests for the output checker (Vitest)

## Decisions made while building (October 2026)

- Years 7 and 8 only for now. Year 9 has theme tokens in the spec but no pages.
- `LessonVideo` takes `clip="bigIdea"`, not `slot=` (reserved by Astro). Videos named by the
  convention in docs/VIDEOS.md are found without any frontmatter.
- Lesson components are passed to MDX by the lesson page, so `index.mdx` needs no imports.
  `PyChecker task="id"` looks the task up in the lesson's own tasks.json.
- Checker: an exception or a timeout is reported before any output comparison (a crashed
  program's output is incomplete). A prompt left inside `input("...")` gets its own hint.
  `includePrompts` and `trimLineEnds` live in `src/lib/checker-config.ts`.
- Run is interactive: when the program calls `input()`, the page asks, then re-runs the
  program with the answers so far (random is seeded per Run so replays match).
- Programs that print more than 100,000 characters are stopped and treated as a timeout.
- Model answers live in git-ignored `solutions.json` files next to each `tasks.json`, checked
  locally by `scripts/verify-tasks.py`. The `codegrade/` folder is git-ignored too.
- See docs/ADDING-LESSONS.md for the lesson format.
