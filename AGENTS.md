# AGENTS.md

## Commands
- `npm run start` — vite dev server, port **3627**, mode `test` (hosted with `--host`)
- `npm run lint` — `tsc --noEmit` + `eslint . --fix` (this IS the typecheck; there is no separate typecheck script)
- `npm run test` / `npm run test:watch` — vitest (jsdom, globals on; excludes `src/electron-app/**`)
- `npm run build` — outputs to **`build/`**, not `dist/`. `console.log` calls are stripped in builds (`esbuild.pure`).
- Deploy pipeline runs `lint → test → build` in that order (see `do/deploy-the-code.ts`); do the same before committing.

## Structure
- Single npm root, three targets:
  - **Frontend PWA**: `src/front/` — React 19 + TanStack Router + vite-plugin-pwa. Routes live in `src/front/routes/tree/`; the route tree `src/front/routes/routeTree.gen.ts` is **generated** — never edit `*.gen.ts` files (also `src/regexpert.gen/`, `src/attr-styler.gen/`).
  - **Backend**: `src/back/` — Node/express (`back.index.ts`), runs from a compiled `back.index.cjs` built by `do/build-back-index.ts`; `start-local-back.ts` builds + runs it. In production it runs as systemd service `jesmyl_soki` (scripts `relog`/`re-start`/`re-status` in `src/back/package.json`). `src/back/**` contains live runtime data under `+case/` dirs (users, storages, configs as JSON) — these are data, not code; some are imported directly (e.g. `back/apps/index/+case/userRoles.json`).
  - **Electron app**: `src/electron-app/` has its **own package.json** and lockfile; use the `el-*` scripts from the root (`el-compile`, `el-test`, `el-build`, `el-deploy`), not plain npm there.

## Config & env (not .env-based)
- Backend config comes from JSON: `src/back/.env.json` (local), `.env.server.json` (server), merged with `host-config.json`. Target host is selected via `freshHostConfig.ts` / `host-configs/*.json` (jesmyl.ru, we-in.ru). Root `.env*` files are for other tooling.
- Drizzle: schema `src/back/drizzle.schema.ts`, migrations output `drizzle.migrations/` (also mirrored inside `src/back/`); Postgres via `src/back/docker-compose.yml`. Many back files have compiled `.cjs` twins — edit the `.ts` source, not the `.cjs`.
- Path aliases (tsconfig `paths`, baseUrl `src`) — use them, they differ per feature-slice layer: `#shared/* #features/* #widgets/* #basis/* #routes/*`, app slices `$cm $cm+editor $bible $q $tuner $index $storages $gamer $freeshow` each with FSD layers `app/processes/pages/widgets/features/entities/shared`, plus `x/*`, `shared/*`, `front/*`, `back/*`, `bibles/*`.

## OpenCode house rules
- `.opencode/opencode.jsonc` sets `instructions: .opencode/tools/philosophy.md` — before writing code you MUST load the matching skill: `frontend-philosophy` for UI work, `code-philosophy` for logic/backend. See `.opencode/README.md` for agent/profile details.
