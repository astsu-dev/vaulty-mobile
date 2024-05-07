import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function UploadIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M7.5 20a1 1 0 10-2 0h2zm18.2 0a1 1 0 10-2 0h2zM16.389 7.282a1 1 0 00-1.577-1.23l1.577 1.23zM9.61 12.718a1 1 0 001.577 1.23l-1.577-1.23zm6.777-6.666a1 1 0 00-1.577 1.23l1.578-1.23zm3.623 7.896a1 1 0 001.578-1.23l-1.577 1.23zM16.6 6.667a1 1 0 10-2 0h2zm-2 14.666a1 1 0 102 0h-2zM5.5 20v1.333h2V20h-2zm0 1.333c0 2.738 2.17 5 4.9 5v-2c-1.578 0-2.9-1.319-2.9-3h-2zm4.9 5h10.4v-2H10.4v2zm10.4 0c2.73 0 4.9-2.262 4.9-5h-2c0 1.681-1.322 3-2.9 3v2zm4.9-5V20h-2v1.333h2zM14.812 6.052l-5.2 6.666 1.576 1.23 5.2-6.666-1.577-1.23zm0 1.23l5.2 6.666 1.576-1.23-5.2-6.666-1.577 1.23zm-.212-.615v14.666h2V6.667h-2z"
        fill={color}
      />
    </BaseIcon>
  );
}
