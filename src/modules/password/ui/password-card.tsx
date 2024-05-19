import { Text, View } from "react-native";
import { Password } from "../store/password";
import { useCopyPassword } from "../use-copy-password";
import { CopyIcon, ScalablePressable, useTheme } from "@/ui";

export type PasswordCardProps = {
  password: Pick<Password, "name" | "username" | "password">;
  onPress?: () => void;
};

export function PasswordCard({ password, onPress }: PasswordCardProps) {
  const { colors, scale } = useTheme();
  const copyPassword = useCopyPassword();

  const handleOnCopyPasswordPress = async () => {
    await copyPassword(password.password);
  };

  return (
    <ScalablePressable
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        gap: scale(10.5),
        backgroundColor: colors.secondary,
        borderRadius: scale(16),
        paddingStart: scale(20),
        paddingEnd: scale(14.5),
        paddingVertical: scale(18),
      }}
      onPress={onPress}
    >
      <View
        style={{
          gap: scale(12),
        }}
      >
        <Text
          style={{
            fontFamily: "Gilroy-SemiBold",
            fontSize: scale(14),
            color: colors.text,
          }}
        >
          {password.name}
        </Text>
        {password.username && (
          <Text
            style={{
              fontFamily: "Gilroy-SemiBold",
              fontSize: scale(12),
              color: colors.subtext,
            }}
          >
            {password.username}
          </Text>
        )}
      </View>
      <ScalablePressable
        onPress={handleOnCopyPasswordPress}
        style={{
          padding: scale(5.5),
        }}
      >
        <CopyIcon />
      </ScalablePressable>
    </ScalablePressable>
  );
}
