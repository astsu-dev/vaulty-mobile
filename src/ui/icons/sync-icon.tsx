import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function SyncIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        fill={color}
        d="M24.573 5.667a1.013 1.013 0 0 0-1 1v3.24l-1.12-1.12a9.653 9.653 0 0 0-16 3.706.987.987 0 0 0 .614 1.334c.11.019.223.019.333 0a1.013 1.013 0 0 0 .947-.68 7.507 7.507 0 0 1 1.826-2.934 7.68 7.68 0 0 1 10.84 0l1.12 1.12H18.92a1 1 0 0 0 0 2h5.653a.987.987 0 0 0 1-1V6.667a1 1 0 0 0-1-1ZM24.907 18.24a1.015 1.015 0 0 0-1.334.627 7.506 7.506 0 0 1-1.826 2.933 7.68 7.68 0 0 1-10.84 0l-1.12-1.12h3.293a1 1 0 1 0 0-2H7.427a.987.987 0 0 0-1 1v5.653a1 1 0 1 0 2 0v-3.24l1.12 1.12a9.654 9.654 0 0 0 16-3.706.987.987 0 0 0-.64-1.267Z"
      />
    </BaseIcon>
  );
}
