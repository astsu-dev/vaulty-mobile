import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { ScrollView, View } from "react-native";
import { RootStackParamList } from "./root-stack-param-list";
import { ScreenLayout } from "./screen-layout";
import {
  AppearanceSettingsSection,
  ChangePasswordNameTruncateStyleSheet,
} from "@/modules/appearance";
import { BackupSettingsSection } from "@/modules/backup";
import { CreditsSettingsSection } from "@/modules/credits";
import {
  ChangeLanguageSheet,
  LanguageSettingsSection,
  useLang,
} from "@/modules/lang";
import { RemoteClipboardSettingsSection } from "@/modules/remote-clipboard";
import { DeleteVaultSheet } from "@/modules/vault";
import { VersionSettingsSection } from "@/modules/version";
import { Button, TrashIcon, useTheme } from "@/ui";

export function SettingsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Settings">) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const changeLanguageSheetRef = useRef<BottomSheetModal>(null);
  const deleteVaultSheetRef = useRef<BottomSheetModal>(null);
  const changePasswordNameTruncateStyleSheetRef =
    useRef<BottomSheetModal>(null);

  const handleOnPressPresentDeleteVaultSheet = () => {
    deleteVaultSheetRef.current?.present();
  };

  const handleOnDeleteVault = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };

  const handleOnPickBackupFile = () => {
    navigation.navigate("ImportBackup");
  };

  const handleOnChangePasswordPress = () => {
    navigation.navigate("ChangeVaultPassword");
  };

  const handleOnRemoteClipboardSettingsPress = () => {
    navigation.navigate("RemoteClipboardSettings");
  };

  return (
    <BottomSheetModalProvider>
      <ScreenLayout
        header={{
          title: lang.settingsScreen.headerTitle,
          backButton: true,
          separator: true,
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            gap: scale(24),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              gap: scale(16),
            }}
          >
            <AppearanceSettingsSection
              changePasswordNameTruncateStyleSheetRef={
                changePasswordNameTruncateStyleSheetRef
              }
            />
            <BackupSettingsSection
              onPickBackupFile={handleOnPickBackupFile}
              onChangePasswordPress={handleOnChangePasswordPress}
            />
            <RemoteClipboardSettingsSection
              onPressRemoteClipboardSettingsCard={
                handleOnRemoteClipboardSettingsPress
              }
            />
            <LanguageSettingsSection sheetRef={changeLanguageSheetRef} />
            <VersionSettingsSection />
            <CreditsSettingsSection />
          </View>
          <Button
            text={lang.settingsScreen.deleteVaultButton}
            variant="danger"
            leftIcon={<TrashIcon size="md" color={colors.lightText} />}
            onPress={handleOnPressPresentDeleteVaultSheet}
          />
        </ScrollView>
      </ScreenLayout>
      <ChangeLanguageSheet sheetRef={changeLanguageSheetRef} />
      <DeleteVaultSheet
        sheetRef={deleteVaultSheetRef}
        onDelete={handleOnDeleteVault}
      />
      <ChangePasswordNameTruncateStyleSheet
        sheetRef={changePasswordNameTruncateStyleSheetRef}
      />
    </BottomSheetModalProvider>
  );
}
