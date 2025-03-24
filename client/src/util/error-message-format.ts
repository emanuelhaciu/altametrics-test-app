export function formatErrorMessage(error: unknown): string {
    if (!error) return "An unexpected error occurred";
    
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as {message: unknown}).message);
    }
    
    return String(error);
  }