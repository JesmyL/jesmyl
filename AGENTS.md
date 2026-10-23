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

### Code writing rules

- Write optimal code: reuse what already exists — search hard for an existing implementation (`shared/`, utils) before writing a new one.
- Prefer built-ins over hand-rolled code — before writing a helper, check for a native one (`Array.isArray`, `Object.hasOwn`, `structuredClone`, `at`, `flat`, etc.) and only then for an existing util in `shared/utils`.
- Keep code local and minimal — the final bundle should contain as few characters as possible.
- Everything that ends up in the frontend bundle must be as small as possible — this is the core philosophy.
- State/identifier values should be numbers, not strings — use enums instead of string literals for state identifiers (e.g. `montserrat = 'montserrat'` is bad practice).
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
- Locale strings: always write user-facing text translations via `translateBase` / `translateDynamic` — never inline raw text.
- Do not add translations for a new locale key if the text is identical in all languages — just keep the single same value in each locale file (no need to invent per-language variants).
- Never write blind type casts like `as CmAudioTail` (branded/type asserts on unverified data) — write proper types and parse/validate at the boundary so the casts become unnecessary.
- In this project, the term `songs` is not used — the correct name is `coms` (short for "compositions"). Name variables, types, files and identifiers accordingly.
- Removing an entry from `BaseLocaleKey` (locale keys): never delete it outright — mark it `@deprecated` in `_BaseLocaleKey.ts` and change its translations in all `src/back/locales/base/{ru,en,kz,ua,...}.ts` files to `''` instead of removing the keys.
- When marking a `BaseLocaleKey` entry `@deprecated`, add the tag ONLY in `_BaseLocaleKey.ts` — do not add `@deprecated` tags or extra comments at usage sites or locale files.

## Assistant reply formatting

- Every assistant reply must be bilingual: write the English text FIRST, then immediately the Russian translation in parentheses. No markup, no HTML, no ANSI color codes.
- Apply this to every piece/chunk of text in the reply, not just the first paragraph.
- Translation is sentence-by-sentence: each English sentence is immediately followed by its Russian translation.
- Grouping several English sentences into a paragraph IS allowed, BUT each English sentence within it must still be immediately followed by its Russian translation in parentheses — no sentence may appear without its translation right after it.
- When the user writes "zapiwi" (запиши), persist the instruction into this AGENTS.md so it applies to all future sessions.
- Example: Done. (Готово.)
