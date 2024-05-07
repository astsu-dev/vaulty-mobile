import * as React from "react";
import Svg, { SvgProps } from "react-native-svg";
import { useTheme } from "../theme";

type IconSize = "md" | "lg" | "xlg";

const iconSizeToProps: Record<IconSize, { width: number; height: number }> = {
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 32,
    height: 32,
  },
  xlg: {
    width: 40,
    height: 40,
  },
};

export type BaseIconProps = SvgProps & {
  size?: IconSize;
  color?: string;
};

export function BaseIcon({ children, size = "lg", ...props }: BaseIconProps) {
  const { scale } = useTheme();

  const { width, height } = iconSizeToProps[size];

  return (
    <Svg
      fill="none"
      width={scale(width)}
      height={scale(height)}
      viewBox="0 0 32 32"
      {...props}
    >
      {children}
    </Svg>
  );
}
