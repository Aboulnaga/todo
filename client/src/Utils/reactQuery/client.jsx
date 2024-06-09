import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient();

export default function AppQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
