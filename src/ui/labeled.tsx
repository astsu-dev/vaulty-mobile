import React, { PropsWithChildren } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "./theme";

export type LabeledProps = PropsWithChildren & {
  label: string;
  style?: StyleProp<ViewStyle>;
  gap?: number;
};

export function Labeled({ label, children, style, gap = 4 }: LabeledProps) {
  const { colors, scale } = useTheme();

  return (
    <View
      style={[
        {
          gap: scale(gap),
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: "Gilroy-SemiBold",
          fontSize: scale(12),
          color: colors.subtext,
          marginStart: scale(16),
        }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}
