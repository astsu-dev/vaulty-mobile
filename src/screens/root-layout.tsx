import { ComponentProps } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/ui";

export function RootLayout({ style, children }: ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView
      style={[
        {
          flex: 1,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          backgroundColor: colors.primary,
        },
        style,
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
