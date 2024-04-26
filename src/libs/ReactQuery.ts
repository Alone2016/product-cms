import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueries,
  useInfiniteQuery,
  useIsFetching,
  useMutation,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
});

export {
  dehydrate,
  useQueries,
  Hydrate,
  QueryClient,
  useQuery,
  useInfiniteQuery,
  useIsFetching,
  QueryClientProvider,
  queryClient,
  useMutation,
  ReactQueryDevtools,
};
