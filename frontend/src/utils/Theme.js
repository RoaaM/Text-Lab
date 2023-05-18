import React, { useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ColorModeContext } from "./context";

function Theme({ children }) {
  //   if ( localStorage.getItem("mode")) {
  //     localMode = localStorage.getItem("mode");
  //   } else {
  //     localMode = "light";
  //   }

  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("mode", mode === "light" ? "dark" : "light");
      },
    }),
    [mode]
  );

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      let localMode = localStorage.getItem("mode");
      setMode(localMode);
    } else {
      setMode("light");
    }
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === "light"
            ? {
                background: {
                  paper: "#c4d4f4",
                },
                text: {
                  primary: "#8553eb",
                },
                secondary: {
                  main: "#687ddb",
                },
              }
            : {}),
        },
      }),

    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Theme;
