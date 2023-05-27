import { React, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", 0);

  const configColors = [
    {
      background: "#FFFFFF",
      primary: "#B44FFF59",
      primaryText: "#000000",
      secondaryText: "#B44FFF",
      borderInput: "#B44FFF59",
      focusInputBackground: "#B44FFF10",
      focusInputBorder: "#B44FFF",
      disabledInput: "#B44FFF30",
    },
  ];

  const themeObject = {
    colors: configColors[theme],
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeObject}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
