import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function RightArrowIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        fill={color}
        d="M17.644 21.943a1 1 0 1 0 1.38 1.448l-1.38-1.448Zm8.38-5.219a1 1 0 1 0-1.38-1.448l1.38 1.448Zm-1.38 0a1 1 0 1 0 1.38-1.448l-1.38 1.448Zm-5.62-8.115a1 1 0 1 0-1.38 1.448l1.38-1.448ZM25.333 17a1 1 0 0 0 0-2v2ZM6.666 15a1 1 0 1 0 0 2v-2Zm12.356 8.39 7-6.666-1.38-1.448-7 6.667 1.38 1.448Zm7-8.114-7-6.667-1.38 1.448 7 6.667 1.38-1.448Zm-.69-.276H6.668v2h18.666v-2Z"
      />
    </BaseIcon>
  );
}
