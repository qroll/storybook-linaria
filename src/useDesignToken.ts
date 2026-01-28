import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Retrieve a single CSS variable value at runtime
 * @param variableName - The CSS variable name (e.g., "--primary-50")
 * @returns The resolved value of the CSS variable
 */
export const getCssVariableValue = (variableName: string): string => {
  if (typeof window === "undefined") {
    return ""; // SSR fallback
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

/**
 * React hook for accessing design tokens with automatic updates on theme changes
 * @param tokenName - The CSS variable name (e.g., "--primary-50")
 * @returns The resolved value of the CSS variable
 */
export const useDesignToken = (tokenName: string): string => {
  const { theme } = useTheme();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    // Small delay to ensure CSS variables are applied after theme change
    const timeoutId = setTimeout(() => {
      const computedValue = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();
      setValue(computedValue);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [theme, tokenName]);

  return value;
};

/**
 * Retrieve multiple CSS variable values at once
 * @param tokenNames - Array of CSS variable names
 * @returns Object mapping variable names to their resolved values
 */
export const getDesignTokens = (
  tokenNames: string[]
): Record<string, string> => {
  if (typeof window === "undefined") {
    return tokenNames.reduce((acc, name) => {
      acc[name] = "";
      return acc;
    }, {} as Record<string, string>);
  }

  const styles = getComputedStyle(document.documentElement);
  return tokenNames.reduce((acc, name) => {
    acc[name] = styles.getPropertyValue(name).trim();
    return acc;
  }, {} as Record<string, string>);
};

/**
 * React hook for accessing multiple design tokens with automatic updates on theme changes
 * @param tokenNames - Array of CSS variable names
 * @returns Object mapping variable names to their resolved values
 */
export const useDesignTokens = (
  tokenNames: string[]
): Record<string, string> => {
  const { theme } = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const styles = getComputedStyle(document.documentElement);
      const newValues = tokenNames.reduce((acc, name) => {
        acc[name] = styles.getPropertyValue(name).trim();
        return acc;
      }, {} as Record<string, string>);
      setValues(newValues);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [theme, tokenNames.join(",")]);

  return values;
};
