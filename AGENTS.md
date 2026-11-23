# AGENTS.md

## Project instructions

- This repository keeps project-specific instruction files named `AGENTS.*.md` (e.g. `AGENTS.jesmyl.md`). Always read and follow ALL `AGENTS.*.md` files applicable to the project you are working in — they extend these universal rules.
- New instructions must always be persisted into the appropriate `AGENTS.*.md` file: project-specific instructions go into the project-specific file (e.g. `AGENTS.jesmyl.md`), universal ones into `AGENTS.md`.

## Code writing rules

- Write code comments ONLY where the user gave specific clarifications about changes that are not obvious from the code itself; such a comment must record exactly that clarification. Do NOT write comments anywhere else (no Russian-language block comments).
- When performing any work, read such clarification comments and take them into account. Any other comments are not authoritative and must not be relied upon. If an existing comment contradicts the new task (edits), ask the user how to proceed in that specific situation instead of silently changing or removing it.

## OpenCode house rules

- Never make git commits yourself. At the end of your work you may suggest a commit message, but never run `git commit` (or push/reset) on your own initiative — only when the user explicitly asks for that exact operation.
- Commit messages must always be written in English.

## Assistant reply formatting

- Every assistant reply must be bilingual: write the English text FIRST, then immediately the Russian translation in parentheses. No markup, no HTML, no ANSI color codes.
- Apply this to every piece/chunk of text in the reply, not just the first paragraph.
- Translation is sentence-by-sentence: each English sentence is immediately followed by its Russian translation.
- Grouping several English sentences into a paragraph IS allowed, BUT each English sentence within it must still be immediately followed by its Russian translation in parentheses — no sentence may appear without its translation right after it.
- When the user writes "zapiwi" (запиши), persist the instruction into the appropriate `AGENTS.*.md` file so it applies to all future sessions: project-specific instructions go into the project-specific file (e.g. `AGENTS.jesmyl.md`), universal ones into `AGENTS.md`.
- Clarifying questions asked via the question tool must also be bilingual — both the question text AND every answer option (variant): English text followed immediately by the Russian translation in parentheses, same as assistant replies.
- EVERY answer option (variant) must carry its Russian duplicate in both places — in the label itself and in the description; the Russian duplicate in the label is mandatory, not only in the description, because labels are rendered as the short clickable choices. No answer option may be left English-only, and no option may be skipped or added without its Russian duplicate.
- Tab/session titles (the tabs OpenCode shows) must be written in Russian.
- When the user writes "prepare commit" (or variants like "prigotov' commit" / "podgotov' komit"): inspect the changes made in the currently open dialog-tab (the OpenCode session/tab where the conversation is happening, not a specific tab number), stage ONLY the specific hunks/changes (selective staging, e.g. `git add -p`) — never whole files, so unrelated changes in the same files stay out of the commit — and write the commit message in that same tab's chat. Never commit — only stage and propose the message (per the no-commit rule above).
- Example: Done. (Готово.)
