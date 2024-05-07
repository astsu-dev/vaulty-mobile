import * as Haptics from "expo-haptics";
import { ToastAndroid } from "react-native";
import { UnavailableSharingError, exportBackup } from "../export";
import { BackupFilePickCancelledError, pickBackupFile } from "../import";
import { useBackupFileStore } from "../store/backup-file-store";
import { useLang } from "@/modules/lang";
import { usePasswordStore } from "@/modules/password";
import { SettingsCard, SettingsSection } from "@/modules/settings";
import { useVaultCredentialsStore } from "@/modules/vault";
import { DownloadIcon, KeyIcon, UploadIcon } from "@/ui";

export type BackupSettingsSectionProps = {
  onPickBackupFile?: () => void;
  onChangePasswordPress?: () => void;
};

export function BackupSettingsSection({
  onPickBackupFile,
  onChangePasswordPress,
}: BackupSettingsSectionProps) {
  const lang = useLang();
  const { passwords } = usePasswordStore((state) => ({
    passwords: state.passwords,
    setPasswords: state.setPasswords,
  }));
  const { encryptionKey } = useVaultCredentialsStore((state) => ({
    encryptionKey: state.encryptionKey,
  }));
  const { setBackupFileUri } = useBackupFileStore((state) => ({
    setBackupFileUri: state.setBackupFileUri,
  }));

  if (!encryptionKey) {
    throw new Error("Encryption key is not set");
  }

  const handleOnPressExportBackup = async () => {
    try {
      await exportBackup(passwords, encryptionKey);
    } catch (err) {
      let msg: string;

      if (err instanceof UnavailableSharingError) {
        msg = lang.errors.unavailableSharingError;
      } else {
        msg = lang.errors.createUnexpectedErrorText(err);
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };

  const handleOnPressImportBackup = async () => {
    try {
      const fileUri = await pickBackupFile();
      setBackupFileUri(fileUri);
      onPickBackupFile?.();
    } catch (err) {
      if (err instanceof BackupFilePickCancelledError) {
        return;
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      ToastAndroid.show(
        lang.errors.createUnexpectedErrorText(err),
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <SettingsSection label={lang.settings.backupSection.label}>
      <SettingsCard
        text={lang.settings.backupSection.exportBackupCardText}
        leftIcon={<DownloadIcon size="md" />}
        onPress={handleOnPressExportBackup}
      />
      <SettingsCard
        text={lang.settings.backupSection.importBackupCardText}
        leftIcon={<UploadIcon size="md" />}
        onPress={handleOnPressImportBackup}
      />
      <SettingsCard
        text={lang.settings.backupSection.changePasswordCardText}
        leftIcon={<KeyIcon size="md" />}
        onPress={onChangePasswordPress}
      />
    </SettingsSection>
  );
}
