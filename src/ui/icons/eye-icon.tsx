import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function EyeIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.92}
        d="M24.96 16.914c0 3.03-4.012 5.486-8.96 5.486-4.948 0-8.96-2.456-8.96-5.486s4.012-5.485 8.96-5.485c4.948 0 8.96 2.455 8.96 5.485Z"
        clipRule="evenodd"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.92}
        d="M18.24 16.914A2.24 2.24 0 1 1 16 14.72a2.217 2.217 0 0 1 2.24 2.194Z"
        clipRule="evenodd"
      />
      <Path
        fill={color}
        d="M15.04 11.43a.96.96 0 1 0 1.92 0h-1.92Zm1.92-4.39a.96.96 0 1 0-1.92 0h1.92Zm7.736 2.63a.96.96 0 1 0-1.71-.872l1.71.872Zm-3.55 2.735a.96.96 0 1 0 1.71.872l-1.71-.872ZM9.016 8.798a.96.96 0 1 0-1.71.872l1.71-.872Zm.129 4.48a.96.96 0 1 0 1.71-.873l-1.71.872Zm7.815-1.849V7.04h-1.92v4.39h1.92Zm6.025-2.631-1.84 3.607 1.711.872 1.84-3.607-1.71-.872Zm-15.68.872 1.84 3.607 1.71-.872-1.84-3.607-1.71.872Z"
      />
    </BaseIcon>
  );
}
