'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pokemon from './Pokemon';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Home;
