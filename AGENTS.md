# AGENTS.md

## Project instructions

- This repository keeps project-specific instruction files named `AGENTS.*.md` (e.g. `AGENTS.jesmyl.md`). Always read and follow ALL `AGENTS.*.md` files applicable to the project you are working in — they extend these universal rules.
- New instructions must always be persisted into the appropriate `AGENTS.*.md` file: project-specific instructions go into the project-specific file (e.g. `AGENTS.jesmyl.md`), universal ones into `AGENTS.md`.

## Code writing rules

- Every code block must carry a comment describing how that specific block is supposed to work; before making any corrections inside a block, always consult its comment first — if the comment contradicts the new changes, ask the user how to proceed (update the comment, or keep it). These code-block comments must be written in Russian.

## OpenCode house rules

- Never make git commits yourself. At the end of your work you may suggest a commit message, but never run `git commit` (or push/reset) on your own initiative — only when the user explicitly asks for that exact operation.
- Commit messages must always be written in English.

## Assistant reply formatting

- Every assistant reply must be bilingual: write the English text FIRST, then immediately the Russian translation in parentheses. No markup, no HTML, no ANSI color codes.
- Apply this to every piece/chunk of text in the reply, not just the first paragraph.
- Translation is sentence-by-sentence: each English sentence is immediately followed by its Russian translation.
- Grouping several English sentences into a paragraph IS allowed, BUT each English sentence within it must still be immediately followed by its Russian translation in parentheses — no sentence may appear without its translation right after it.
- When the user writes "zapiwi" (запиши), persist the instruction into the appropriate `AGENTS.*.md` file so it applies to all future sessions: project-specific instructions go into the project-specific file (e.g. `AGENTS.jesmyl.md`), universal ones into `AGENTS.md`.
- Clarifying questions asked via the question tool must also be bilingual: English text followed immediately by the Russian translation in parentheses, same as assistant replies.
- When the user writes "prepare commit" (or variants like "prigotov' commit" / "podgotov' komit"): inspect the changes made in the currently open dialog-tab (the OpenCode session/tab where the conversation is happening, not a specific tab number), stage ONLY the specific hunks/changes (selective staging, e.g. `git add -p`) — never whole files, so unrelated changes in the same files stay out of the commit — and write the commit message in that same tab's chat. Never commit — only stage and propose the message (per the no-commit rule above).
- Example: Done. (Готово.)
