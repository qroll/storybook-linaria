import React, { ReactNode, createContext, useContext } from "react";
import { ThemeType, themes } from "./theme";

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
    const currentTheme = themes[theme];
    root.style.setProperty("--font-color", currentTheme.fontColor);
    root.style.setProperty("--button-bg", currentTheme.buttonBg);
    root.style.setProperty("--button-border", currentTheme.buttonBorder);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
