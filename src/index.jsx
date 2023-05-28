import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import ResetStyle from "./styles/ResetStyle";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FiltersProvider } from "./contexts/FiltersProvider";
import { TripProvider } from "./contexts/TripProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyle />
    <ThemeProvider>
      <GlobalStyle />
      <TripProvider>
        <AuthProvider>
          <FiltersProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FiltersProvider>
        </AuthProvider>
      </TripProvider>
    </ThemeProvider>
  </React.StrictMode>
);
