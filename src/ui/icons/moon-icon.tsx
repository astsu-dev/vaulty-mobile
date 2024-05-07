import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function MoonIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        clipRule="evenodd"
        d="M9.6 16.001a9.406 9.406 0 011.408-4.978 8.53 8.53 0 013.767-3.3 7.88 7.88 0 014.844-.512l.233.054A8.665 8.665 0 0017.3 9.902a9.405 9.405 0 00-1.408 4.978 9.282 9.282 0 002.455 6.336 8.25 8.25 0 004.052 2.4 7.987 7.987 0 01-4.417 1.345 8.118 8.118 0 01-5.928-2.624A9.283 9.283 0 019.6 16.001z"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
