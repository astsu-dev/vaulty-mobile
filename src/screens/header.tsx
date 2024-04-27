import { Text, View } from "react-native";
import { useTheme } from "@/ui";

export type HeaderProps = {
  title?: string;
  rightButtons?: React.ReactNode;
  separator?: boolean;
};

export function Header({ title, rightButtons, separator = true }: HeaderProps) {
  const { colors, scale } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          gap: scale(16),
        },
        separator
          ? {
              paddingBottom: scale(6),
              borderBottomWidth: 1,
              borderBottomColor: colors.secondary,
            }
          : {},
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: scale(8),
        }}
      >
        {/* Back button */}
        <Text
          style={{
            fontFamily: "Gilroy-SemiBold",
            fontSize: scale(16),
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: scale(8),
        }}
      >
        {rightButtons}
      </View>
    </View>
  );
}
