import { StatusBar } from "expo-status-bar";
import { ComponentProps } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/ui";

export function RootLayout({ style, children }: ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets();
  const { colors, scale } = useTheme();

  return (
    <GestureHandlerRootView
      style={[
        {
          flex: 1,
          paddingTop: insets.top + scale(12),
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          backgroundColor: colors.primary,
        },
        style,
      ]}
    >
      {children}
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
