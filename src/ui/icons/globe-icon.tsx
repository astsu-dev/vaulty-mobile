import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function GlobeIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M6 16h20M6 16c0 5.523 4.477 10 10 10M6 16c0-5.523 4.477-10 10-10m10 10c0 5.523-4.477 10-10 10m10-10c0-5.523-4.477-10-10-10m0 20c-8.05-8.8-3.354-17 0-20m0 20c8.05-8.8 3.354-17 0-20"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
