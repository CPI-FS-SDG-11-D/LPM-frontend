import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState } from "react";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import { CookiesProvider } from "react-cookie";

export default function UtilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <MantineProvider>
          <BrowserRouter>{children}</BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </MantineProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
