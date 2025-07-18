import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function FaceIdIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M9.333 4H6.667A2.667 2.667 0 004 6.667v2.666M22.666 4h2.667A2.667 2.667 0 0128 6.667v2.666M21.334 10.667v2.666M10.666 10.667v2.666M12 21.333s1.333 1.334 4 1.334 4-1.334 4-1.334M16 10.667v6.666h-1.334M9.333 28H6.667A2.667 2.667 0 014 25.333v-2.666M22.666 28h2.667A2.667 2.667 0 0028 25.333v-2.666"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
