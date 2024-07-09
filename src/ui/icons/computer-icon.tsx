import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function ComputerIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.04142 10.5332V17.1149C6.98198 19.4776 8.84772 21.4419 11.2104 21.504H20.7912C23.1543 21.4427 25.0208 19.4781 24.9614 17.1149V10.5332C25.0208 8.17044 23.1551 6.20616 20.7925 6.14404H11.2104C8.84772 6.20616 6.98198 8.17044 7.04142 10.5332Z"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.60156 25.344H22.4016"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}
