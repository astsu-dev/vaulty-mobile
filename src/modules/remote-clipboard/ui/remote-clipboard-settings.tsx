import { Text, View } from "react-native";
import { useRemoteClipboardSettingsStore } from "../store/remote-clipboard-settings-store";
import { useLang } from "@/modules/lang";
import { PasswordInput } from "@/modules/password";
import { SettingsCard } from "@/modules/settings";
import {
  ComputerIcon,
  Labeled,
  LinkIcon,
  Switch,
  TextInput,
  useTheme,
} from "@/ui";

export function RemoteClipboardSettings() {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const { enabled, url, apiKey, setState } = useRemoteClipboardSettingsStore();

  const handleOnChangeEnableRemoteClipboard = (enabled: boolean) => {
    setState({ enabled });
  };

  const handleOnPressRemoteClipboardSettingsCard = () => {
    handleOnChangeEnableRemoteClipboard(!enabled);
  };

  return (
    <View
      style={{
        gap: scale(16),
      }}
    >
      <SettingsCard
        leftIcon={<ComputerIcon size="md" />}
        text={lang.remoteClipboardSettingsScreen.enableRemoteClipboardCardText}
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
        <Labeled label={lang.remoteClipboardSettingsScreen.urlInputLabel}>
          <TextInput
            value={url}
            placeholder={lang.remoteClipboardSettingsScreen.urlInputPlaceholder}
            disabled={!enabled}
            onChangeText={(url) => setState({ url: url.trim() })}
            leftIcon={<LinkIcon size="md" />}
          />
        </Labeled>
        <Labeled label={lang.remoteClipboardSettingsScreen.apiKeyInputLabel}>
          <PasswordInput
            value={apiKey}
            placeholder={
              lang.remoteClipboardSettingsScreen.apiKeyInputPlaceholder
            }
            disabled={!enabled}
            onChangeText={(apiKey) => setState({ apiKey: apiKey.trim() })}
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
        {lang.remoteClipboardSettingsScreen.descriptionFirstLine}
        {"\n"}
        {lang.remoteClipboardSettingsScreen.descriptionSecondLine}
      </Text>
    </View>
  );
}
