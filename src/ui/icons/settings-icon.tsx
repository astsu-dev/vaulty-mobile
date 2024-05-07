import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function SettingsIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        clipRule="evenodd"
        d="M18.6 16c0 1.473-1.164 2.667-2.6 2.667-1.436 0-2.6-1.194-2.6-2.667 0-1.473 1.164-2.666 2.6-2.666 1.436 0 2.6 1.194 2.6 2.666z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M9.848 24.134l-3.27-7.05a2.156 2.156 0 010-2.289l3.25-6.939a2.61 2.61 0 012.224-1.189h7.901a2.61 2.61 0 012.225 1.19l3.242 6.933a2.156 2.156 0 010 2.29l-3.263 7.054a2.61 2.61 0 01-2.236 1.2h-7.838a2.61 2.61 0 01-2.235-1.2z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
