# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tooling Preferences

- Package management: **pnpm**
- Styling: **vanilla-extract**

## Branch Strategy

- `dev` — daily development, contains all content including `docs/`
- `main` — clean template branch, future projects clone from here

Develop on `dev`. When ready to publish, switch to `main` and run `git merge dev` — the
`pre-merge-commit` hook will automatically filter out dev-only content (`docs/`, `.gitignore.main`).

## Important: After Cloning

Run `pnpm install` to activate the git hook via the `prepare` script:

```bash
pnpm install
```

This sets `core.hooksPath` to `.githooks`, enabling the `pre-merge-commit` filter.
