# @atom-forge/svelte-helpers

Svelte helper utilities, types, and components for building type-safe Svelte 5 applications.

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
For extra HTML attributes to be spread onto elements (`...props`). Always place at the end of the intersection.
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
Enforce mutually exclusive props instead of string unions for better type safety.
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

### debounce / debounceAsync
Standard utilities to limit function execution rate.
```ts
const handleInput = debounce((val) => {
    console.log(val);
}, 300);

const search = debounceAsync(async (query) => {
    return await api.fetch(query);
}, 500);
```

### as
TypeCast helper for Svelte templates and snippets. The TypeScript `as` keyword is not allowed inside Svelte template expressions — use this helper to restore type safety inline.

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
A helper component to safely render snippets dynamically. Especially useful when an API expects a **Component** — you can pass `RenderSnippet` wrapping your snippet.
```svelte
<RenderSnippet {snippet} args={{ item, index }} />
```
