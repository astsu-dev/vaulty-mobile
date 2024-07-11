import { memo } from "react";
import { Text, View, ViewStyle } from "react-native";
import { Password } from "../store/password";
import { useCopyPassword, useCopyPasswordToRemote } from "../use-copy-password";
import { useRemoteClipboardSettingsStore } from "@/modules/remote-clipboard";
import { ComputerIcon, CopyIcon, ScalablePressable, useTheme } from "@/ui";

export type PasswordCardProps = {
  password: Pick<Password, "name" | "username" | "password">;
  onPress?: () => void;
  style?: ViewStyle;
};

export const PasswordCard = memo(function PasswordCard({
  password,
  onPress,
  style,
}: PasswordCardProps) {
  const { colors, scale } = useTheme();
  const copyPassword = useCopyPassword();
  const copyPasswordToRemote = useCopyPasswordToRemote();
  const { enabled: remoteClipboardEnabled } = useRemoteClipboardSettingsStore(
    (state) => ({ enabled: state.enabled }),
  );

  const handleOnCopyPasswordPress = async () => {
    await copyPassword(password.password);
  };

  const handleOnCopyPasswordToRemotePress = async () => {
    await copyPasswordToRemote(password.password);
  };

  return (
    <ScalablePressable
      style={[
        {
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: scale(10.5),
          backgroundColor: colors.secondary,
          borderRadius: scale(16),
          paddingStart: scale(20),
          paddingEnd: scale(14.5),
          paddingVertical: scale(18),
        },
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          gap: scale(12),
        }}
      >
        <Text
          style={{
            fontFamily: "Gilroy-SemiBold",
            fontSize: scale(14),
            color: colors.text,
          }}
          ellipsizeMode="head"
          numberOfLines={1}
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
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {password.username}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: scale(4),
        }}
      >
        <ScalablePressable
          onPress={handleOnCopyPasswordPress}
          style={{
            paddingEnd: remoteClipboardEnabled ? 0 : scale(5.5),
          }}
        >
          <CopyIcon />
        </ScalablePressable>
        {remoteClipboardEnabled && (
          <ScalablePressable
            onPress={handleOnCopyPasswordToRemotePress}
            style={{
              paddingEnd: scale(5.5),
            }}
          >
            <ComputerIcon />
          </ScalablePressable>
        )}
      </View>
    </ScalablePressable>
  );
});
