import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";
import { createTheme, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import App from "./containers/App";
import { history } from "./utils/historyUtils";
import { FlagProvider } from "@unleash/proxy-client-react";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    // htmlFontSize: 18.285714285714286,
    fontSize: 14 * 0.875,
    body1: {
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "6px 0 7px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: "6px 0 7px",
        },
      },
    },
    // MuiInput: {
    //   defaultProps: {
    //     inputProps: {
    //       backgroundColor: "green",
    //       height: "300px",
    //     },
    //   },
    // },
  },
});

const config = {
  url: "http://localhost:4242/api/frontend", // Your local instance Unleash API URL
  clientKey: "*:development.459ce548bbc8bc0f1a94a1edea2d23a63a6288221512e9bdac1c1de9", // Your frontend token
  refreshInterval: 15, // How often (in seconds) the client should poll the proxy for updates
  appName: "cypress-realworld-app", // The name of your application. It's only used for identifying your application
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <Router history={history}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <FlagProvider config={config}>
          <App />
        </FlagProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Router>
);
