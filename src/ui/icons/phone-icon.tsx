import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function PhoneIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M19.84 4.48h-7.68a3.84 3.84 0 00-3.84 3.84v15.36a3.84 3.84 0 003.84 3.84h7.68a3.84 3.84 0 003.84-3.84V8.32a3.84 3.84 0 00-3.84-3.84z"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 24.32a.636.636 0 01-.453-.187.635.635 0 01-.08-.808.637.637 0 01.658-.273A.64.64 0 0116 24.32z"
        fill={color}
      />
      <Path
        d="M16 24.96a1.28 1.28 0 110-2.56 1.28 1.28 0 010 2.56z"
        fill={color}
      />
    </BaseIcon>
  );
}
