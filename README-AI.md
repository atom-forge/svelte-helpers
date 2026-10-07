# AI agent context

This repository contains `@atom-forge/svelte-helpers`, a small TypeScript library for Svelte 5. It provides reusable prop types, type utilities, runtime helpers, and a snippet-rendering component; it is not a component framework or an application.

## Read documentation according to the task

- For public API usage, examples, or behavior changes, read [the API reference](docs/api.md). It covers every export and important runtime limitations.
- Before editing, checking, or packaging the library, read [the development guide](docs/development.md). It explains the source layout and available commands.
- For the human-facing overview, read [README.md](README.md).
- For release context, read [CHANGELOG.md](CHANGELOG.md).

## Implementation context

- `src/lib/index.ts` defines the public API. Inspect the relevant source file before changing behavior; source is authoritative when documentation differs.
- `src/lib/types.ts` contains compile-time types; the other library files implement runtime helpers or the Svelte component.
- Svelte is a peer dependency. Follow Svelte 5 conventions and existing TypeScript patterns.
- `as` is an identity function with type assertions, not runtime validation or coercion.
- `variantMap` selects the first truthy entry, or the default. An `untrack` example captures initial values rather than providing reactive updates.
- `debounceAsync` does not settle superseded calls and does not forward callback rejections to its returned promise. Do not assume cancellation or robust error propagation.
- `RenderSnippet` requires a snippet accepting one argument object and a matching `args` object; it does not handle missing snippets.

## Change discipline

Keep edits focused on the requested task and preserve existing user changes. Edit source rather than generated `dist/` or `.svelte-kit/` files. When public behavior or exports change, update the API documentation and the public barrel as needed. Run the relevant checks from the development guide and report what actually passed or failed.
