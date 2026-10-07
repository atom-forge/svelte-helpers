# @atom-forge/svelte-helpers

Small TypeScript utilities, prop types, and a snippet-rendering component for Svelte 5 applications.

## Installation

```bash
bun add @atom-forge/svelte-helpers
```

Requires Svelte 5 (`^5.0.0`) as a peer dependency.

## What's included?

- **Prop types:** `ClassProp`, `AnyProp`, `ChildrenProp`, and `ChildrenPropOptional` for common component interfaces.
- **Type utilities:** `XOR` for mutually exclusive variants and `AtLeastOne` for requiring at least one property.
- **Helpers:** `variantMap` for boolean variants, `debounce` / `debounceAsync` for delayed execution, and `as` for type assertions without runtime conversion.
- **Component:** `RenderSnippet` adapts a snippet with an argument object to a component interface.

Import helpers and components from `@atom-forge/svelte-helpers`; use `import type` for types.

## Documentation

- [API reference and examples](docs/api.md) — all public exports, usage patterns, and limitations.
- [Development guide](docs/development.md) — repository layout, checks, and packaging.
- [Changelog](CHANGELOG.md) — release history.

AI agents working with this repository should start with [README-AI.md](README-AI.md).
