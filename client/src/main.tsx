import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/public-sans";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { App } from "./App.tsx";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
