import React from "react";
import logo from "./logo.svg";
import { Employees } from "./features/Employees/Employees";
import "./App.css";
import { Divider, ThemeProvider } from "@mui/material";
import { theme } from "./app/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Divider variant="middle" sx={{ margin: "1rem" }} />
        <div className="Content">
          <Employees />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
