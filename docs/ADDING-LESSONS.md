# Adding a lesson

One lesson is one folder. Copy an existing lesson folder and change it.

```
src/content/lessons/year-8/03-lists/11-searching-a-list/
├── index.mdx      the page
└── tasks.json     the code tasks and their tests
```

- The number at the start of each folder sets the order. Units are folders too
  (`03-lists`), and must also be listed in `src/content/years/year-8.md`.
- `lesson:` in the frontmatter is the lesson number shown on the page and used in
  video file names. Keep it unique within the year.
- `draft: true` shows the lesson when you run `npm run dev`, but leaves it out of the live site.
- To feature a lesson on the home page, add its folder path to `thisWeek:` in
  `src/content/years/year-N.md`.

## Components you can use in index.mdx

No imports needed.

| Component | Example |
|---|---|
| ParentTip | `<ParentTip>Read the big idea aloud.</ParentTip>` |
| Note | `<Note title="Remember">...</Note>` |
| PyChecker | `<PyChecker task="hello-name" predict="What will it print?" />` or `brief="Your task..."` |
| TraceTable | `<TraceTable code={...} columns={[...]} rows={[{ line: 1, cells: [...] }]} />` |
| SpotTheDifference | `<SpotTheDifference pairs={[{ kind, a, b, answer }]} />` |
| Parsons | `<Parsons prompt="..." lines={["line 1", "    line 2"]} />` |
| InputFlow | `<InputFlow typed="15" />` |
| MemoryBoxes | `<MemoryBoxes boxes={[{ name: "age", value: "12" }]} />` or `list={{ name, items }}` |
| OutputDiff | `<OutputDiff expected="Hello, Sam!" got="hello, Sam!" />` |
| QuizMe | `<QuizMe questions={[{ q: "...", a: "..." }]} />` (use backticks for code) |
| SelfRating | `<SelfRating question="Could you explain...?" />` |
| LessonVideo | `<LessonVideo clip="bigIdea" />` (see VIDEOS.md) |

Each `## Heading` becomes a numbered section and a dot in the progress bar.

## tasks.json

```json
{
  "tasks": [
    {
      "id": "hello-name",
      "title": "Hello, what's your name?",
      "starter": "name = input()\n",
      "tests": [{ "input": "Susie", "output": "Hello, Susie!" }],
      "hints": { "capitals": "…", "spaces": "…", "punctuation": "…", "lines": "…", "error": "…", "timeout": "…", "other": "…" }
    }
  ]
}
```

- Like CodeBash, checked tasks use `input()` with nothing in the brackets.
  Several inputs go in one string separated by `\n`.
- Put the model answers in `solutions.json` next to `tasks.json`, as `{ "task-id": "code" }`.
  `python3 scripts/verify-tasks.py` runs every answer against its tests. These files are
  git-ignored so answers never appear in the public repository; keep your own backup.
- Any hint you leave out falls back to a general one. For errors, the hint falls back to
  the matching error decoder entry (`src/data/errors.ts`).

## Before you push

```
npm test
python3 scripts/verify-tasks.py
npm run build
```
