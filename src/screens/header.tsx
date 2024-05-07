import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RightArrowIcon, ScalablePressable, useTheme } from "@/ui";

export type HeaderProps = {
  title?: string;
  backButton?: boolean;
  rightButtons?: React.ReactNode;
  separator?: boolean;
};

export function Header({
  title,
  backButton,
  rightButtons,
  separator = true,
}: HeaderProps) {
  const { colors, scale } = useTheme();
  const navigation = useNavigation();

  const handleOnBackButtonPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

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
        {backButton && (
          <ScalablePressable onPress={handleOnBackButtonPress}>
            <RightArrowIcon
              size="md"
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </ScalablePressable>
        )}
        <Text
          style={{
            fontFamily: "Gilroy-SemiBold",
            fontSize: scale(16),
            color: colors.text,
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
