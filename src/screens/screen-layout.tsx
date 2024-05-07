import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { ComponentProps, useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header, HeaderProps } from "./header";
import { useTheme } from "@/ui";

type ScreenLayoutProps = ComponentProps<typeof View> & {
  header?: HeaderProps;
};

export function ScreenLayout({ header, style, children }: ScreenLayoutProps) {
  const { colors, scale } = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.primary);
  }, [colors.primary]);

  return (
    <View
      style={[
        {
          flex: 1,
          gap: scale(16),
          // Use top insets here but not in RootLayout because the backdrop from bottom sheets will not be visible on the status bar
          paddingTop: insets.top + scale(12),
          paddingHorizontal: scale(20),
          paddingBottom: scale(20),
          backgroundColor: colors.primary,
        },
        style,
      ]}
    >
      <StatusBar style="auto" />
      <Header {...header} />
      {children}
    </View>
  );
}
