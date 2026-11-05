# AGENTS.md

## Commands

- `npm run start` — vite dev server, port **3627**, mode `test` (hosted with `--host`)
- `npm run lint` — `tsc --noEmit` + `eslint . --fix` (this IS the typecheck; there is no separate typecheck script)
- `npm run test` / `npm run test:watch` — vitest (jsdom, globals on; excludes `src/electron-app/**`)
- `npm run build` — outputs to **`build/`**, not `dist/`. `console.log` calls are stripped in builds (`esbuild.pure`).
- Deploy pipeline runs `lint → test → build` in that order (see `do/deploy-the-code.ts`); do the same before committing.

## Structure

- Single npm root, three targets:
  - **Frontend PWA**: `src/front/` — React 19 + TanStack Router + vite-plugin-pwa. Routes live in `src/front/routes/tree/`; the route tree `src/front/routes/routeTree.gen.ts` is **generated** — never edit `*.gen.ts` files (also `src/regexpert.gen/`, `src/attr-styler.gen/`). The contents of `src/regexpert.gen/` must not be modified manually — they regenerate automatically (e.g. on `vitest` runs), so just leave the generated output in place and never hand-edit it.
  - **Backend**: `src/back/` — Node/express (`back.index.ts`), runs from a compiled `back.index.cjs` built by `do/build-back-index.ts`; `start-local-back.ts` builds + runs it. In production it runs as systemd service `jesmyl_soki` (scripts `relog`/`re-start`/`re-status` in `src/back/package.json`). `src/back/**` contains live runtime data under `+case/` dirs (users, storages, configs as JSON) — these are data, not code; some are imported directly (e.g. `back/apps/index/+case/userRoles.json`).
  - **Electron app**: `src/electron-app/` has its **own package.json** and lockfile; use the `el-*` scripts from the root (`el-compile`, `el-test`, `el-build`, `el-deploy`), not plain npm there.

## Config & env (not .env-based)

- Backend config comes from JSON: `src/back/.env.json` (local), `.env.server.json` (server), merged with `host-config.json`. Target host is selected via `freshHostConfig.ts` / `host-configs/*.json` (jesmyl.ru, we-in.ru). Root `.env*` files are for other tooling.
- Drizzle: schema `src/back/drizzle.schema.ts`, migrations output `drizzle.migrations/` (also mirrored inside `src/back/`); Postgres via `src/back/docker-compose.yml`. Many back files have compiled `.cjs` twins — edit the `.ts` source, not the `.cjs`.
- Path aliases (tsconfig `paths`, baseUrl `src`) — use them, they differ per feature-slice layer: `#shared/* #features/* #widgets/* #basis/* #routes/*`, app slices `$cm $cm+editor $bible $q $tuner $index $storages $gamer $freeshow` each with FSD layers `app/processes/pages/widgets/features/entities/shared`, plus `x/*`, `shared/*`, `front/*`, `back/*`, `bibles/*`.

## OpenCode house rules

- `.opencode/opencode.jsonc` sets `instructions: .opencode/tools/philosophy.md` — before writing code you MUST load the matching skill: `frontend-philosophy` for UI work, `code-philosophy` for logic/backend. See `.opencode/README.md` for agent/profile details.
- Never make git commits yourself. At the end of your work you may suggest a commit message, but never run `git commit` (or push/reset) on your own initiative — only when the user explicitly asks for that exact operation.
- Commit messages must always be written in English.
- Locale keys (`EditorLocaleKey`/`DynLocaleKey`/`BaseLocaleKey`): only ADD new numeric keys — never bump `editorLocaleMinVersion`/`baseLocaleMinVersion` (in `src/back/apps/index/tsjrpc.base/lib/requestFreshes.ts`) anymore; those delivery guards stay untouched. For visual clarity, group new keys next to related existing entries in the dictionaries (`localeEditorRu`/`localeEditorEn`/...).
- Route placement applies to ALL route areas, not just `!other/$appName`: every page must live in the proper area of `src/front/routes/tree/` matching its app/feature slice — never create root-level routes for pages belonging to a specific area, e.g. `/schedule-users/1704636528751` goes under `src/front/routes/tree/!other.$appName/...` (substitute the correct area for each case).

### Code writing rules

- Write optimal code: reuse what already exists — search hard for an existing implementation (`shared/`, utils) before writing a new one.
- Prefer built-ins over hand-rolled code — before writing a helper, check for a native one (`Array.isArray`, `Object.hasOwn`, `structuredClone`, `at`, `flat`, etc.) and only then for an existing util in `shared/utils`.
- Whenever data is transmitted for humans to read (e-mails, digests, notifications, admin UIs), never show raw logins/ids — display a person's readable identity choosing the first non-empty value in the priority order: fio | nick | email | login.
- Keep code local and minimal — the final bundle should contain as few characters as possible.
- Everything that ends up in the frontend bundle must be as small as possible — this is the core philosophy.
- Class fields that are not part of the public API must be `private`/`protected` — never expose a field that only the class itself reads or writes.
- State/identifier values should be numbers, not strings — use enums instead of string literals for state identifiers (e.g. `montserrat = 'montserrat'` is bad practice).
- Encode string unions like `'prev' | 'next'` used as identifiers/state into numeric `const enum` instead of string literal unions.
- Use only `const enum`, never plain `enum`.
- Performance: hoist regexps out of functions (build once via `lazyInit`), build char-class regexps from object keys (`objectKeys(dict).join('')`), and prefer a single `.replace` pass with a replacer dict over chained `.replace` calls.
- Never wrap a single static regexp in `lazyInit(() => makeRegExp('...'))` — a module-scope `makeRegExp('...')` is already built once at load; keep `lazyInit` only where deferred building is genuinely required (e.g. regexps composed from object keys at runtime).
- Reference example: `escapeHtmlLazy` in `src/shared/utils/string.utils.ts`.
- Never write redundant null-coalescing like `rows[0]?.mod ?? null` — `null` and `undefined` are treated as the same thing; use the `nil` type everywhere instead of `null | undefined`.
- If a type can be `nil`, its default value should be `null` (not `undefined`); prefer `null` over `undefined` wherever possible.
- Export types/interfaces/consts ONLY from model files (`model.ts`); component/UI files export only their components.
- Keep code maximally laconic: prefer compact literals (e.g. space-separated extension lists keyed by prefix) converted at runtime via `lazyInit`, over verbose hand-written dicts.
- Reuse existing object utils instead of `Object.entries(...).map(...)` — e.g. `mapObjectEntries` from `shared/utils/object.utils`.
- In JSX conditional rendering, avoid double negation (`!!cond && (<X/>)`): express a render-on-truthy condition as `!cond || (<X/>)` instead — when `cond` is truthy, `!cond` is `false` and the right side renders; when falsy, the expression short-circuits to `true`, which React renders as nothing. Same semantics, no `!!`.
- Icons: if a needed icon is missing from `knownStameskaIconNames`, just add it there rather than working around it.
- Never write `cursor: pointer;` in CSS/styles — use the `.pointer` utility class on the element instead.
- Never use raw `addEventListener`/`removeEventListener` — use the project's own `addEventListenerPipe` event/subscription system instead.
- Small styles — via Tailwind utility classes; complex `@keyframes` (e.g. `playingPulse`) — keep in `styled` from `@emotion/styled`, not in the global Tailwind entry.
- Decide between Tailwind classes and emotion `styled.*\`\`` (or `css\`\``) by the FINAL production bundle size: prefer `styled.*\`\`` when its raw CSS is smaller than the Tailwind utilities that would be generated — e.g. complex computed arbitrary values like `[--size:min(calc(100vw/10),70px)]`, or many descendant-variant classes like `[&_.button]:…`, which each emit extra generated CSS.
- Locale strings: always write user-facing text translations via `translateBase` / `translateDynamic` — never inline raw text.
- Do not add translations for a new locale key if the text is identical in all languages — just keep the single same value in each locale file (no need to invent per-language variants).
- Do not add new locale texts when existing keys can be reused — search the existing BaseLocaleKey entries first and only add a new key if no existing text fits.
- In translated text/locale keys, name interpolation placeholders with single letters — e.g. `$d`/`$t`/`$f` instead of `$track`/`$total`/`$free` — and map descriptive local variables to them at the call site (e.g. `Удалено: $d МБ. Занято: $t МБ. Свободно: $f МБ.`).
- In conditional locale texts, maximally contract `IF(...).THEN\`...\`.ELSE\`...\` templates — move the shared part out of the branches and keep only the differing prefix/suffix inside them (e.g. `Уведомления в приложении: ${IF('$v').THEN\`в\`.ELSE\`от\`}ключены`, `App notifications: ${IF('$v').THEN\`en\`.ELSE\`dis\`}abled`).

#### Locale / locale-key work

- When cleaning locales: remove every key that is not referenced anywhere in the code and every `@deprecated #version` entry; never give a locale entry an empty string value `''` (mark unused entries `@deprecated #version` instead).
- Renumber locale `const enum`s (`BaseLocaleKey`/`EditorLocaleKey`/`DynLocaleKey`) sequentially from 0 with no gaps; never rename enum keys, only change their values; never touch `[BaseLocaleKey.Langi]: Langi.Ru` or `[BaseLocaleKey.LocaleVersion]: 0`.
- Group same-meaning texts together, separated from other groups by a blank line.
- Prefer toggle texts (`IF`/`THEN`/`ELSE`) for interchangeable texts that differ in a small part; locale `IF` toggles must never have an empty `THEN` or `ELSE` branch — move the shared prefix/suffix outside the `IF` and invert the call-site boolean to drop the empty branch (e.g. `Н${IF('$v').THEN\`е н\`}апоминать мне`).
- Locale boolean interpolation values are typed `boolean | Bool` — call sites pass raw boolean expressions directly; never write `cond ? Bool.True : Bool.False` conversions for locale interpolations.
- Whenever locale texts change in a way that affects delivered locale dictionaries (merges, contractions, key changes), ALWAYS ask the user whether to bump `editorLocaleMinVersion`/`baseLocaleMinVersion` in `src/back/apps/index/tsjrpc.base/lib/requestFreshes.ts` — never bump them on your own initiative.
- Contract words in `FUNCTION('dec')`/plural and `IF` constructions when the shared part is ~50% or more of the words; below that keep full words (e.g. `видим`/`невидим`, `song`/`songs` → `song${...'', 's'}` are contractible; do not contract pairs with less than half shared).
- Never write blind type casts like `as CmAudioTail` (branded/type asserts on unverified data) — write proper types and parse/validate at the boundary so the casts become unnecessary.
- Never use `throw new Error('...')` — always throw the plain string: `throw '...'`. Catch-sites must treat thrown values as strings, not Error instances.
- In this project, the term `songs` is not used — the correct name is `coms` (short for "compositions"). Name variables, types, files and identifiers accordingly.
- Locale entries must NEVER be given an empty string value `''` (e.g. `[BaseLocaleKey.CmComReplaceConfirm]: '',` is forbidden): for any locale key whose text is no longer needed (unused/unreferenced), instead mark the entry as `@deprecated #version`, where `#version` is the current `num` value read from `src/shared/values/+version.json` (e.g. `@deprecated 12`).
- Inside useLiveQuery the callback must contain no extra logic and must return raw Dexie values only (or undefined to skip querying when there is nothing to fetch); never wrap/transform results inside — do it outside via useMemo (e.g. new CmCat(icat)).
- NEVER modify, remove, or revert any code, files, or config beyond exactly what the user explicitly asked for. Only touch what the task requires. Before deleting or altering anything not directly requested, stop and ask the user. (Никогда не изменяй, не удаляй и не откатывай код/файлы/конфиги сверх того, что пользователь явно попросил.)
- After modifying any file, format it with eslint-prettier (e.g. `npx eslint <file> --fix`) before finishing the task.

## Assistant reply formatting

- Every assistant reply must be bilingual: write the English text FIRST, then immediately the Russian translation in parentheses. No markup, no HTML, no ANSI color codes.
- Apply this to every piece/chunk of text in the reply, not just the first paragraph.
- Translation is sentence-by-sentence: each English sentence is immediately followed by its Russian translation.
- Grouping several English sentences into a paragraph IS allowed, BUT each English sentence within it must still be immediately followed by its Russian translation in parentheses — no sentence may appear without its translation right after it.
- When the user writes "zapiwi" (запиши), persist the instruction into this AGENTS.md so it applies to all future sessions.
- Clarifying questions asked via the question tool must also be bilingual: English text followed immediately by the Russian translation in parentheses, same as assistant replies.
- When the user writes "upor9do4i locales" (or "upor9do4i translates" / "упорядочи локали"): remove empty locales (keys whose translation is `''`) and any `@deprecated` keys (entries marked `@deprecated #version`) — but only keys that are not referenced anywhere in the code; group translations; renumber the `const enum BaseLocaleKey` entries sequentially from 0 to the last one; and in `indexTSJRPCBaseRequestFreshes` replace the literal `#` in `visitInfo.version < #` with the HARDCODED number read from `src/shared/values/+version.json` (`num` field) plus 1 (e.g. num=12 → `visitInfo.version < 13`).
- When the user writes "prepare commit" (or variants like "prigotov' commit" / "podgotov' komit"): inspect the changes made in the currently open dialog-tab (the OpenCode session/tab where the conversation is happening, not a specific tab number), stage ONLY the specific hunks/changes (selective staging, e.g. `git add -p`) — never whole files, so unrelated changes in the same files stay out of the commit — and write the commit message in that same tab's chat. Never commit — only stage and propose the message (per the no-commit rule above).
- Example: Done. (Готово.)
