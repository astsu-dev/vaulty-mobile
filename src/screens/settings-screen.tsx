import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { ScrollView, View } from "react-native";
import { RootStackParamList } from "./root-stack-param-list";
import { ScreenLayout } from "./screen-layout";
import { AppearanceSettingsSection } from "@/modules/appearance";
import { BackupSettingsSection } from "@/modules/backup";
import { useLang } from "@/modules/lang";
import { DeleteVaultSheet } from "@/modules/vault";
import { Button, TrashIcon, useTheme } from "@/ui";

export function SettingsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Settings">) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const deleteVaultSheetRef = useRef<BottomSheetModal>(null);

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

  return (
    <BottomSheetModalProvider>
      <ScreenLayout
        header={{
          title: lang.settingsScreen.headerTitle,
          separator: true,
          backButton: true,
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            gap: scale(16),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              gap: scale(16),
            }}
          >
            <AppearanceSettingsSection />
            <BackupSettingsSection
              onPickBackupFile={handleOnPickBackupFile}
              onChangePasswordPress={handleOnChangePasswordPress}
            />
          </View>
          <Button
            text={lang.settingsScreen.deleteVaultButton}
            variant="danger"
            leftIcon={<TrashIcon size="md" color={colors.lightText} />}
            onPress={handleOnPressPresentDeleteVaultSheet}
          />
        </ScrollView>
      </ScreenLayout>
      <DeleteVaultSheet
        sheetRef={deleteVaultSheetRef}
        onDelete={handleOnDeleteVault}
      />
    </BottomSheetModalProvider>
  );
}
