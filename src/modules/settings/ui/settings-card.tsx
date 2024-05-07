import { PressableProps, Text, View, ViewStyle } from "react-native";
import { ScalablePressable, useTheme } from "@/ui";

type SettingsCardProps = {
  text?: string;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
} & PressableProps;

export function SettingsCard({
  text,
  leftIcon,
  rightAction,
  disabled,
  style,
  ...props
}: SettingsCardProps) {
  const { colors, scale } = useTheme();

  return (
    <ScalablePressable
      disabled={disabled}
      style={[
        {
          borderRadius: scale(16),
          paddingVertical: scale(14),
          paddingHorizontal: scale(12),
          backgroundColor: colors.secondary,
        },
        style,
      ]}
      {...props}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: scale(16),
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: scale(6),
            alignItems: "center",
          }}
        >
          {leftIcon}
          <Text
            style={{
              fontFamily: "Gilroy-SemiBold",
              fontSize: scale(14),
              color: colors.text,
            }}
          >
            {text}
          </Text>
        </View>
        {rightAction}
      </View>
    </ScalablePressable>
  );
}
