import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function CheckmarkIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M7.04 16.64l5.974 5.76L24.96 10.88"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
