import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function TrashIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        clipRule="evenodd"
        d="M21.017 12H10.183c-.598 0-1.083.497-1.083 1.11V22c0 1.84 1.455 3.333 3.25 3.333h6.5a3.21 3.21 0 002.298-.976c.61-.625.952-1.473.952-2.357v-8.89c0-.613-.485-1.11-1.083-1.11zM19.5 9.333l-.941-1.929a1.297 1.297 0 00-1.162-.737h-3.593c-.493 0-.943.285-1.163.737l-.94 1.93h7.8z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.433 16.444a1 1 0 00-2 0h2zm-2 4.444a1 1 0 102 0h-2zm6.334-4.444a1 1 0 10-2 0h2zm-2 4.444a1 1 0 102 0h-2zM19.5 8.333a1 1 0 100 2v-2zm2.6 2a1 1 0 000-2v2zm-10.4 0a1 1 0 000-2v2zm-2.6-2a1 1 0 000 2v-2zm3.333 8.11v4.445h2v-4.444h-2zm4.334 0v4.445h2v-4.444h-2zm2.733-6.11h2.6v-2h-2.6v2zm-7.8-2H9.1v2h2.6v-2z"
        fill={color}
      />
    </BaseIcon>
  );
}
