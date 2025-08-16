import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store";
import '@/styles/globals.css';
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return <QueryClientProvider client={queryClient}>
    <Provider store={store}>

      <div className="flex">
        <button type="button" onClick={() => router.push('/')}>Home</button>
        <button type="button" onClick={() => router.push('/cart')}>Cart</button>
      </div>
      <Component {...pageProps} />;
      <ToastContainer position="top-center" autoClose={3000} />
    </Provider>
  </QueryClientProvider>
}
