# Client State Management

## Default: Local State

**Always prefer `useState` for UI state.**

Pass state down via props or lift state up to common parent components.

## Zustand (Rare Cases Only)

Stores are located in `app/{route}/_store/` directories.

### When to Use

Use Zustand **only** when state is:

- **Client-only temporary state** that shouldn't be in URL (e.g., draft form data, tutorial progress)
- **Shared UI state** across multiple components (e.g., modal state + data, sidebar toggle)
- **Real-time input tracking** where you need to distinguish between "draft" and "confirmed" values

### When NOT to Use

Do NOT use Zustand for:

- Component-local state (use `useState`)
- Server state (use React Query)
- Shareable state (use URL `searchParams`)
- Simple state sharing between components (use props or lift state up)
