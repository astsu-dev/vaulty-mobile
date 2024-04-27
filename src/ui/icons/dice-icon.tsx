import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function DiceIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.59 6.667h-7.18a5.776 5.776 0 0 0-5.743 5.808v7.05a5.776 5.776 0 0 0 5.744 5.808h7.178a5.776 5.776 0 0 0 5.744-5.808v-7.05a5.776 5.776 0 0 0-5.744-5.808Z"
        clipRule="evenodd"
      />
      <Path
        fill={color}
        d="M12 12.667a.662.662 0 0 1-.471-.196.662.662 0 0 1-.083-.841.665.665 0 0 1 1.026-.102.665.665 0 0 1-.101 1.026.664.664 0 0 1-.37.113Z"
      />
      <Path
        fill={color}
        d="M12 13.333a1.334 1.334 0 1 1 0-2.667 1.334 1.334 0 0 1 0 2.667ZM16 16.667a.663.663 0 0 1-.554-.297.665.665 0 0 1 .083-.841.662.662 0 0 1 .841-.083.662.662 0 0 1 .284.684.664.664 0 0 1-.654.537Z"
      />
      <Path
        fill={color}
        d="M16 14.667a1.334 1.334 0 1 1 0 2.667 1.334 1.334 0 0 1 0-2.667ZM20 11.333a.664.664 0 0 1 .667.667c0 .178-.07.345-.195.471a.662.662 0 0 1-.842.083.666.666 0 0 1 .37-1.22Z"
      />
      <Path
        fill={color}
        d="M20 13.333a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666ZM20 19.333c.178 0 .346.07.472.196a.662.662 0 0 1 .083.841.664.664 0 0 1-.685.284.666.666 0 0 1 .13-1.32Z"
      />
      <Path
        fill={color}
        d="M20 18.667a1.334 1.334 0 1 1 0 2.667 1.334 1.334 0 0 1 0-2.667ZM12 20.667a.663.663 0 0 1-.554-.297.664.664 0 0 1 .083-.841.662.662 0 0 1 .841-.083.663.663 0 0 1 .284.684.665.665 0 0 1-.654.537Z"
      />
      <Path
        fill={color}
        d="M12 18.667a1.334 1.334 0 1 1 0 2.668 1.334 1.334 0 0 1 0-2.668Z"
      />
    </BaseIcon>
  );
}
