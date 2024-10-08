import { Linking, Text, View, ViewStyle } from "react-native";
import { useRemoteClipboardSettingsStore } from "../store/use-remote-clipboard-settings-store";
import { useLang } from "@/modules/lang";
import { SettingsCard } from "@/modules/settings";
import {
  Button,
  ComputerIcon,
  Labeled,
  PasswordInput,
  Switch,
  TextInput,
  useTheme,
} from "@/ui";

export type RemoteClipboardSettingsProps = {
  style?: ViewStyle;
};

export function RemoteClipboardSettings({
  style,
}: RemoteClipboardSettingsProps) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const { enabled, port, password, setState } = useRemoteClipboardSettingsStore(
    (state) => state,
  );

  const handleOnChangeEnableRemoteClipboard = (enabled: boolean) => {
    setState({ enabled });
  };

  const handleOnPressRemoteClipboardSettingsCard = () => {
    handleOnChangeEnableRemoteClipboard(!enabled);
  };

  const handleOnPressHowToSetupButton = async () => {
    await Linking.openURL(lang.remoteClipboardSettingsScreen.setupGuideLink);
  };

  return (
    <View
      style={[
        {
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      <View
        style={{
          gap: scale(16),
        }}
      >
        <SettingsCard
          leftIcon={<ComputerIcon size="md" />}
          text={
            lang.remoteClipboardSettingsScreen.enableRemoteClipboardCardText
          }
          rightAction={
            <Switch
              size="md"
              enabled={enabled}
              onChange={handleOnChangeEnableRemoteClipboard}
            />
          }
          onPress={handleOnPressRemoteClipboardSettingsCard}
        ></SettingsCard>
        <View
          style={{
            gap: scale(10),
          }}
        >
          <Labeled label={lang.remoteClipboardSettingsScreen.portInputLabel}>
            <TextInput
              keyboardType="numeric"
              value={String(port)}
              placeholder={
                lang.remoteClipboardSettingsScreen.portInputPlaceholder
              }
              disabled={!enabled}
              onChangeText={(port) =>
                setState({ port: Number(port.trim()) || 0 })
              }
            />
          </Labeled>
          <Labeled
            label={lang.remoteClipboardSettingsScreen.passwordInputLabel}
          >
            <PasswordInput
              value={password}
              placeholder={
                lang.remoteClipboardSettingsScreen.passwordInputPlaceholder
              }
              disabled={!enabled}
              onChangeText={(password) =>
                setState({ password: password.trim() })
              }
            />
          </Labeled>
        </View>
        <Text
          style={{
            fontFamily: "Gilroy-Medium",
            fontSize: scale(14),
            lineHeight: scale(14 * 1.4),
            textAlign: "center",
            color: colors.subtext2,
          }}
        >
          {lang.remoteClipboardSettingsScreen.description}
        </Text>
      </View>
      <Button
        text={lang.remoteClipboardSettingsScreen.howToSetupButtonText}
        variant="secondary"
        style={{
          width: "100%",
        }}
        onPress={handleOnPressHowToSetupButton}
      />
    </View>
  );
}
