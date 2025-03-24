import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries globally
      // Or use a function for more control
      // retry: (failureCount, error: any) => {
      //   // Don't retry 4xx errors
      //   return !(error?.response?.status >= 400 && error?.response?.status < 500);
      // },
    },
  },
});