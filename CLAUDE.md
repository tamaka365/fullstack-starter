# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This Is the Starter Dev Branch

This is the development branch of the fullstack-starter project. For architecture, commands, and
monorepo structure, see `CLAUDE.main.md` — that file becomes `CLAUDE.md` on the `main` branch
and in projects that clone from it.

## Tooling

- Package manager: **pnpm**
- Styling: **vanilla-extract**

## Branch Strategy

- `dev` — daily development, contains all content including `.claude/docs/`
- `main` — clean template branch, future projects clone from here

Develop on `dev`. When ready to publish, switch to `main` and run `git merge dev` — the
`post-merge` hook will automatically filter out dev-only content.

## Important: After Cloning

Run `pnpm install` to activate git hooks via the `prepare` script:

```bash
pnpm install
```

This sets `core.hooksPath` to `.githooks` and configures `branch.main.mergeoptions = --no-ff`,
ensuring merges into `main` always produce a merge commit (required for `post-merge` to fire).

## Dev-Only Content (excluded from main)

| Path | Description |
|------|-------------|
| `.claude/docs/` | Internal development docs (todo, version changelogs) |
| `CLAUDE.md` | This file — dev-specific guidance |
| `.gitignore.main` | Template .gitignore for main (also acts as sentinel for hook) |
| `CLAUDE.main.md` | Template CLAUDE.md for main (replaces this file after merge) |
| `.claude/docs.main/` | Template .claude/docs/ for main |
