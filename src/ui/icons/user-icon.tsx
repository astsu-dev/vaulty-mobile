import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function UserIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        clipRule="evenodd"
        d="M19.52 10.56a3.52 3.52 0 11-7.04 0 3.52 3.52 0 017.04 0z"
        stroke={color}
        strokeWidth={1.92}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.92 20.78a.96.96 0 10-1.92.056l1.92-.057zm3.373 4.116v-.96h-.027l.027.96zm5.414 0l.027-.96h-.027v.96zM24 20.836a.96.96 0 10-1.92-.057l1.92.057zm-1.92-.185a.96.96 0 001.92-.057l-1.92.056zm-3.373-4.117v.96h.027l-.027-.96zm-5.414 0l-.027.96h.027v-.96zM8 20.594a.96.96 0 101.92.056L8 20.595zm0 .242a5.175 5.175 0 005.32 5.02l-.055-1.92A3.255 3.255 0 019.92 20.78L8 20.836zm5.293 5.02h5.414v-1.92h-5.414v1.92zm5.387 0a5.175 5.175 0 005.32-5.02l-1.92-.057a3.255 3.255 0 01-3.345 3.157l-.055 1.92zM24 20.594a5.175 5.175 0 00-5.32-5.02l.055 1.92a3.255 3.255 0 013.345 3.157l1.92-.057zm-5.293-5.02h-5.414v1.92h5.414v-1.92zm-5.387 0A5.175 5.175 0 008 20.594l1.92.056a3.255 3.255 0 013.345-3.157l.055-1.919z"
        fill={color}
      />
    </BaseIcon>
  );
}
