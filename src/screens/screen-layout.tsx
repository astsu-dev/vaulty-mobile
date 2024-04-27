import { ComponentProps } from "react";
import { View } from "react-native";
import { Header, HeaderProps } from "./header";
import { useTheme } from "@/ui";

type ScreenLayoutProps = ComponentProps<typeof View> & {
  header?: HeaderProps;
};

export function ScreenLayout({ header, style, children }: ScreenLayoutProps) {
  const { scale } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          gap: scale(16),
          paddingHorizontal: scale(20),
          paddingBottom: scale(20),
        },
        style,
      ]}
    >
      <Header {...header} />
      {children}
    </View>
  );
}
