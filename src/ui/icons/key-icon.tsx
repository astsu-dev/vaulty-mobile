import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function KeyIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m10.865 23.396-1.828 1.833-2.37-2.377 8.517-8.534a5.333 5.333 0 1 1 2.25 2.364l-4.684 4.696 1.957 1.963-1.949 1.953-1.893-1.898Z"
        clipRule="evenodd"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21.504 10.467a2.133 2.133 0 1 1-3.021 0 2.145 2.145 0 0 1 3.02 0Z"
        clipRule="evenodd"
      />
    </BaseIcon>
  );
}
