import React, { ComponentProps } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import { ScalablePressable } from "./scalable-pressable";
import { useTheme } from "./theme";

export type ButtonVariant = "accent" | "secondary" | "danger";

export type ButtonSize = "md" | "lg";

export type ButtonProps = ComponentProps<typeof ScalablePressable> & {
  text?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
};

export function Button({
  text,
  variant = "accent",
  size = "lg",
  style,
  leftIcon,
  ...props
}: ButtonProps) {
  const { colors, scale } = useTheme();

  return (
    <ScalablePressable
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: scale(4),
          padding: size === "lg" ? scale(16) : scale(14),
          borderRadius: scale(16),
          backgroundColor:
            variant === "accent"
              ? colors.text
              : variant === "secondary"
                ? colors.secondary
                : colors.red,
        },
        style,
      ]}
      {...props}
    >
      {leftIcon}
      {text && (
        <Text
          style={{
            fontFamily: "Gilroy-SemiBold",
            fontSize: scale(16),
            color:
              variant === "accent"
                ? colors.primary
                : variant === "secondary"
                  ? colors.text
                  : colors.lightText,
          }}
        >
          {text}
        </Text>
      )}
    </ScalablePressable>
  );
}
