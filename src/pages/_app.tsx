import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import { MantineProvider } from "@mantine/core";

import { configTheme, theme } from "@/utils/ThemeConfig";

import NextNProgress from "nextjs-progressbar";

import { ToastContainer } from "react-toastify";

import { Hydrate, QueryClientProvider, queryClient } from "@/libs/ReactQuery";

import { AuthProvider } from "../libs/Auth";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import "../styles/select.css";
import "../styles/override.toast.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <NextNProgress color="#ED6203" />
          <ToastContainer limit={3} style={{ width: 600 }} />
          <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={configTheme}>
            <Component {...pageProps} />
          </MantineProvider>
          {/* <AuthProvider>
           
            <ReactQueryDevtools initialIsOpen />
          </AuthProvider> */}
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
