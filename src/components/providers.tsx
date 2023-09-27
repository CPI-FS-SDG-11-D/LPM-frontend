import { BrowserRouter } from "react-router-dom";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

export default function UtilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </MantineProvider>
  );
}
