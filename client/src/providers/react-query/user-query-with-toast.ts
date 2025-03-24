import { toast } from "sonner";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { formatErrorMessage } from "@/util/error-message-format";
import { ApiResponse } from "@/dtos/api-response";
import { useEffect } from "react";

export function useQueryWithToast<
  TData = unknown,
  TError = unknown
>(
  options: UseQueryOptions<ApiResponse<TData>, TError>,
  toastOptions?: {
    errorTitle?: string;
    showErrorToast?: boolean;
  }
): UseQueryResult<ApiResponse<TData>, TError> {
  const { errorTitle = "Error", showErrorToast = true } = toastOptions || {};
  
  // Apply default retry configuration to prevent unnecessary retries
  const queryOptions = {
    ...options,
    retry: false, // Disable retries for all queries using this hook
    // Alternatively, use a retry function to be more selective:
    // retry: (failureCount, error: any) => {
    //   // Don't retry on 4xx errors (client errors)
    //   return !(error?.response?.status >= 400 && error?.response?.status < 500);
    // }
  };
  
  const result = useQuery<ApiResponse<TData>, TError>(queryOptions);
  
  // Use useEffect to show toast when error state changes
  useEffect(() => {
    if (result.error && showErrorToast) {
      console.log("called from useQueryWithToast", result.error);
      toast.error(errorTitle, {
        description: formatErrorMessage(result.error),
        duration: 5000, // 5 seconds display time
      });
    }
  }, [result.error, showErrorToast, errorTitle]);
  
  return result;
}