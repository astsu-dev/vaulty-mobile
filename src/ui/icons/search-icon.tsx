import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function SearchIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.44}
        d="M9.351 20.754a8.081 8.081 0 0 1-2.16-4.114 8.17 8.17 0 0 1 .45-4.64 8.004 8.004 0 0 1 2.906-3.606 7.77 7.77 0 0 1 8.765 0A8.002 8.002 0 0 1 22.218 12a8.168 8.168 0 0 1 .449 4.64 8.08 8.08 0 0 1-2.16 4.114 7.789 7.789 0 0 1-11.156 0Z"
        clipRule="evenodd"
      />
      <Path
        fill={color}
        d="M14.938 9.86a.96.96 0 0 0 .203 1.909l-.203-1.91Zm2.37 3.186a.96.96 0 1 0 1.768-.749l-1.768.749Zm3.994 6.905a.96.96 0 1 0-1.356 1.36l1.356-1.36Zm2.98 5.688a.96.96 0 1 0 1.357-1.359l-1.356 1.359Zm-9.141-13.87a2.112 2.112 0 0 1 2.167 1.277l1.768-.749a4.032 4.032 0 0 0-4.138-2.437l.203 1.909Zm4.805 9.541 4.337 4.329 1.356-1.359-4.337-4.329-1.356 1.36Z"
      />
    </BaseIcon>
  );
}
