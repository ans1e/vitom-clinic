"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: ReactNode }): React.JSX.Element {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
}
