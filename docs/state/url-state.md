# URL State Management

Use URL `searchParams` for shareable and bookmarkable state.

## Server Components

Pages receive searchParams as props:

```typescript
interface IProps {
  searchParams: { year: string; model: string };
}

export default async function Page({ searchParams }: IProps) {
  // Use searchParams for data fetching
  const { year, model } = searchParams;
  return <div>{/* ... */}</div>;
}
```

## Client Components

Use custom hooks for URL state manipulation:

### useQueryParam

Read URL params with type inference:

```typescript
const tier = useQueryParam('tier', undefined, parseAsNumber); // number | null
const name = useQueryParam('name', 'default'); // string
```

### useSetQueryParams

Batch update URL params:

```typescript
const setParams = useSetQueryParams(['model', 'year', 'fuel']);
setParams({ model: 'K5', year: '2023' }); // URL updates
```
