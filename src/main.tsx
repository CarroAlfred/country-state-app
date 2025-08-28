import './styles/globals.css';
import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed requests once
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouter />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
);
