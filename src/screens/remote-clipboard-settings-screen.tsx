import { ScrollView } from "react-native";
import { ScreenLayout } from "./screen-layout";
import { useLang } from "@/modules/lang";
import { RemoteClipboardSettings } from "@/modules/remote-clipboard";

export function RemoteClipboardSettingsScreen() {
  const lang = useLang();

  return (
    <ScreenLayout
      header={{
        title: lang.remoteClipboardSettingsScreen.headerTitle,
        backButton: true,
        separator: true,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <RemoteClipboardSettings />
      </ScrollView>
    </ScreenLayout>
  );
}
