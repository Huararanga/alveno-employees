import React from "react";
import Employees from "./features/Employees/Employees";
import { Box, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { theme } from "./app/theme";
import AppBar from "./features/AppBar/AppBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div>
          <AppBar />
          <Box margin="2rem">
            <Employees />
          </Box>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
