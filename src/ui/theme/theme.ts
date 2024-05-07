import { useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";
import { useThemeStore } from "./store/theme-store";

export type ThemeColors = {
  primary: string;
  secondary: string;
  text: string;
  subtext: string;
  subtext2: string;
  red: string;
  lightText: string;
  backdrop: string;
};

export type Theme = {
  colors: ThemeColors;
  scale: (value: number) => number;
  colorScheme: "light" | "dark";
};

function scale(value: number) {
  return value;
}

const LIGHT_THEME: Theme = {
  colors: {
    primary: "#fcfcfc",
    secondary: "#eff1f2",
    text: "#111111",
    subtext: "#555555",
    subtext2: "#a9a9a9",
    red: "#df5529",
    lightText: "#fcfcfc",
    backdrop: "#000000",
  },
  scale,
  colorScheme: "light",
};

const DARK_THEME: Theme = {
  colors: {
    primary: "#1c1c1c",
    secondary: "#272524",
    text: "#d7d7d7",
    subtext: "#a1a1a1",
    subtext2: "#5e5e5e",
    red: "#ca5e3c",
    lightText: "#fcfcfc",
    backdrop: "#ffffff",
  },
  scale,
  colorScheme: "dark",
};

export function useTheme(): Theme {
  const systemColorScheme = useColorScheme();
  const { theme } = useThemeStore();
  const colorScheme = theme === "system" ? systemColorScheme : theme;

  useEffect(() => {
    Appearance.setColorScheme(theme === "system" ? null : theme);
  }, [theme]);

  switch (colorScheme) {
    case "light":
      return LIGHT_THEME;
    case "dark":
      return DARK_THEME;
    default:
      return LIGHT_THEME;
  }
}
