import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function LabelIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M24.308 13.6l-2.732-3.279c-.413-.495-.62-.743-.874-.921a2.342 2.342 0 00-.74-.346c-.298-.08-.62-.08-1.265-.08h-8.55c-1.311 0-1.968 0-2.469.254a2.34 2.34 0 00-1.023 1.024c-.255.5-.255 1.157-.255 2.468v6.558c0 1.312 0 1.967.255 2.468.225.44.583.8 1.023 1.024.5.255 1.156.255 2.465.255h8.554c.645 0 .967 0 1.265-.08.265-.072.516-.19.74-.347.253-.178.46-.425.874-.921l2.732-3.279c.711-.853 1.066-1.28 1.202-1.756.12-.42.12-.866 0-1.286-.136-.476-.49-.902-1.202-1.756z"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
