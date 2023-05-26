import { React, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", 0);

  const configColors = [
    {
      //backgroundUpHeader: "#F53D2D",
      //backgroundDownHeader: "#FF6533",
      background: "#FFFFFF",
      //backgroundAside: "#F5F5F5",
      primary: "#B44FFF59",
      //secondary: "#f53d2d0c",
      primaryText: "#000000",
      secondaryText: "#B44FFF",
      //h1: "#333",
      //logo: "#FFFFFF",
      borderInput: "#B44FFF59",
      focusInputBackground: "#B44FFF10",
      focusInputBorder: "#B44FFF",
      //addToCartBg: "#FFF5F1",
      //addToCartHoverBg: "#ffeae2",
      //success: "lightgreen",
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
