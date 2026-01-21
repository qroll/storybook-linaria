import React, { ReactNode, createContext, useContext } from "react";
import "./theme.css";
import { ThemeType } from "./theme.types.js";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "default",
}) => {
  const [theme, setTheme] = React.useState<ThemeType>(initialTheme);

  React.useEffect(() => {
    const root = document.documentElement;
    // Set data-theme attribute for CSS-based theming
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
