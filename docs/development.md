# Development guide

## Repository layout

- `src/lib/index.ts` — public exports.
- `src/lib/types.ts` — shared prop types, `XOR`, and `AtLeastOne`.
- `src/lib/as.ts`, `debounce.ts`, and `variantMap.ts` — runtime helpers.
- `src/lib/RenderSnippet.svelte` — snippet adapter component.
- `scripts/` — publishing helpers.
- `dist/` and `.svelte-kit/` — generated package and SvelteKit output; do not edit manually.
- `docs/api.md` — public API reference.
- Root `README.md` and `README-AI.md` — human and agent entry points.
- Root `CHANGELOG.md` — release history.

## Setup and validation

Install dependencies with Bun:

```bash
bun install
```

Check TypeScript and Svelte diagnostics:

```bash
bun run check
```

Generate the distributable package and validate its metadata:

```bash
bun run prepack
```

`prepack` runs SvelteKit sync, `svelte-package`, and `publint`. To also build the Vite project, use `bun run build`; it runs `prepack` after the Vite build. There is currently no test script in `package.json`.

## Public API and packaging

Consumers import from `@atom-forge/svelte-helpers`. The package entry point is generated from `src/lib/index.ts`, with declarations and runtime code exported from `dist/`. Svelte `^5.0.0` is a peer dependency.

When adding or changing a public export, update the barrel and [API reference](api.md). Keep the root README a short overview and put detailed documentation in `docs/`. The package's `files` list includes the documentation and both README entry points so their relative links remain usable in the published package.

Publishing commands in `package.json` include `release`, `pub-check`, and `pub`. Inspect the relevant scripts before using them; publishing is a separate, explicit action, not a validation step.

## Related documentation

- [API reference](api.md)
- [Human overview](../README.md)
- [AI agent context](../README-AI.md)
- [Changelog](../CHANGELOG.md)
