# React Query Configuration

Query client is configured in `/shared/components/provider/react-query-client-provider.tsx`.

## Configuration

- **Stale time**: 60 seconds
- **Retry logic**:
  - 4xx errors and schema errors do NOT retry
  - Other errors retry up to 3 times
  - Check via `isApiError()` utility

## Query Key Factory Pattern

Use the query key factory pattern from `domains/shared/utils/queryKeyFactory.ts`:

```typescript
const recommendationKeys = {
  all: ['recommendation'] as const,
  carList: () => [...recommendationKeys.all, 'carList'] as const,
  carListSubmit1: params => [...recommendationKeys.carList(), 'carListSubmit1', params] as const,
};
```

## Query Hooks

Example query hook pattern:

```typescript
function useGetCarList(params) {
  return useQuery<TCarListGetResponse, TApiError>({
    queryFn: () => getCarList(params),
    queryKey: recommendationKeys.carListSubmit1(params),
    enabled: !!params.required, // Conditional query
  });
}
```

## Mutation Hooks

Example mutation hook with cache invalidation:

```typescript
function usePostUserCar() {
  const queryClient = useQueryClient();
  return useMutation<TUserCarPostResponse, Error, IUserCarPostBody>({
    mutationFn: postUserCar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.cars(),
        refetchType: 'active',
      });
    },
  });
}
```
