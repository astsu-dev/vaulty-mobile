import { ComponentProps } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/ui";
import { useKeyboardIsVisible } from "@/utils/hooks";

export function RootLayout({ style, children }: ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets();
  const { colors, scale } = useTheme();

  const isKeyboardVisible = useKeyboardIsVisible();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <GestureHandlerRootView
        style={[
          {
            flex: 1,
            paddingRight: insets.right,
            paddingBottom:
              Platform.OS === "ios" && isKeyboardVisible
                ? scale(18)
                : insets.bottom,
            paddingLeft: insets.left,
            backgroundColor: colors.primary,
          },
          style,
        ]}
      >
        {children}
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
}
