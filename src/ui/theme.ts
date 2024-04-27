import { useColorScheme } from "react-native";

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

export function useTheme(): Theme {
  const colorScheme = useColorScheme();

  if (colorScheme === "light") {
    return {
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
  }

  if (colorScheme === "dark") {
    return {
      colors: {
        primary: "#1c1c1c",
        secondary: "#272524",
        text: "#d7d7d7",
        subtext: "#a1a1a1",
        subtext2: "#5e5e5e",
        red: "#df5529",
        lightText: "#fcfcfc",
        backdrop: "#ffffff",
      },
      scale,
      colorScheme: "dark",
    };
  }

  throw new Error(`Unsupported color scheme: ${colorScheme}`);
}
