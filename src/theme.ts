export type ThemeType = "base" | "default" | "dark" | "light";

export interface Theme {
  fontColor: string;
  buttonBg: string;
  buttonBorder: string;
}

export const themes: Record<ThemeType, Theme> = {
  base: {
    fontColor: "white",
    buttonBg: "#0052CC",
    buttonBorder: "#0052CC",
  },
  default: {
    fontColor: "pink",
    buttonBg: "#0052CC",
    buttonBorder: "#0052CC",
  },
  dark: {
    fontColor: "black",
    buttonBg: "#0052CC",
    buttonBorder: "#0052CC",
  },
  light: {
    fontColor: "yellow",
    buttonBg: "#0052CC",
    buttonBorder: "#0052CC",
  },
};
