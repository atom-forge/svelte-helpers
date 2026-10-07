# API reference

Svelte helper utilities, types, and components for building type-safe Svelte 5 applications.

Import runtime exports from `@atom-forge/svelte-helpers` and types with `import type` from the same package. Examples below assume application-specific values and types are already defined. `twMerge`, where shown, is an external helper, not an export or dependency of this package.

See also: [overview](../README.md), [development guide](development.md).

## Installation

```bash
bun add @atom-forge/svelte-helpers
```

---

## Types

### ClassProp
Standard type for components that accept external CSS classes.
```ts
let { class: classes }: ClassProp = $props();
const cls = $derived(twMerge('base-styles', classes));
```

### AnyProp
For extra attributes to be spread onto elements (`...props`). By convention, place it at the end of the intersection. Its index signature accepts `any`; it does not validate HTML attribute names or values.
```ts
let { class: classes, ...props }: ClassProp & AnyProp = $props();
// ...
<input {...props} class={cls} />
```

### ChildrenProp / ChildrenPropOptional
Consistent naming for snippet props.
```ts
// Required children snippet
let { children }: ChildrenProp = $props();

// Optional children snippet
let { children }: ChildrenPropOptional = $props();

// Parameterized snippet
let { children }: ChildrenProp<[Item]> = $props();
```

### XOR
Enforce mutually exclusive prop shapes. Accepts two to eight type arguments; include `{}` to allow no variant.
```ts
// small OR compact, but not both
type Props = XOR<{ small: true }, { compact: true }, {}>;

// 3+ exclusive variants
type ButtonProps = XOR<{ primary: true }, { secondary: true }, { ghost: true }, {}>;
```

### AtLeastOne
Ensures that at least one of the properties in an object is provided.
```ts
type LabelOrIcon = AtLeastOne<{ label: string; icon: IconDefinition }>;
```

---

## Utilities

### variantMap
Boolean props are simpler in templates; `variantMap` returns the string value for internal logic. Works best when combined with `XOR` or `AtLeastOne` prop types.
```ts
const { small, compact, ...props } = $props();
const size = untrack(() => variantMap({ small, compact }, 'normal'));
// Returns 'small' | 'compact' | 'normal'
```

The first truthy entry in object iteration order wins; if none is truthy, the default is returned. The `untrack` example captures the initial selection; use `$derived(variantMap({ small, compact }, 'normal'))` when the selection should react to prop changes.

### debounce / debounceAsync
Trailing-edge debounce utilities: each call resets a timer, and only the latest arguments are used once calls stop for the delay. The default delay is 300 ms. `debounce` returns `void`; `debounceAsync` returns a promise for the callback result.

**Current limitations:** promises from superseded `debounceAsync` calls remain pending. Callback rejections are not forwarded to the returned promise, which also remains pending in that case. Neither helper exposes cancellation, flushing, or cancellation of already-running work.
```ts
const handleInput = debounce((val) => {
    console.log(val);
}, 300);

const search = debounceAsync(async (query) => {
    return await api.fetch(query);
}, 500);
```

### as
Type assertion helper for Svelte templates and snippets, useful for reusable script-side casters and inline assertions. Every form returns the original value unchanged: it does not validate data, convert primitives, or make an incorrect assertion safe.

**Primitive shorthands** — for inline use in templates:
```svelte
{@const on = as.boolean(td[k])}
{@const label = as.string(item.value)}
{@render list(as.array<string>(items))}
```

Available shorthands: `as.string`, `as.number`, `as.boolean`, `as.array`, `as.object`, `as.function`, `as.any`, `as.unknown`.

**Generic usage** — for custom interfaces inline:
```ts
const user = as<{ name: string; age: number }>(userData);
```

**Script-side casters** — recommended for complex or frequently reused types:
```ts
import { as } from '@atom-forge/svelte-helpers';

const toTask = as<{ title: string; done: boolean }>;
const toKey  = as<keyof TableData>;
```
```svelte
{@const task = toTask(_task)}
{@const on   = as.boolean(td[toKey(k)])}
```

**Snippet parameter typing** — use a script-side caster instead of inline type annotations in snippet params:
```svelte
<script lang="ts">
  import { as } from '@atom-forge/svelte-helpers';
  const itemArgType = as<{ title: string }>;
</script>

{#snippet item(_task)}
  {@const task = itemArgType(_task)}
  {task.title}
{/snippet}
```

---

## Components

### RenderSnippet
A helper component to render a snippet when an API expects a **Component**. Both `snippet` and `args` are required: the snippet accepts one argument object (`Snippet<[Params]>`), and `args` supplies that object. It calls `{@render snippet(args)}` without a missing-snippet fallback.
```svelte
<RenderSnippet {snippet} args={{ item, index }} />
```
