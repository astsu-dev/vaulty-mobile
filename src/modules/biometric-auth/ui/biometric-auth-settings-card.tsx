import { useCallback } from "react";
import {
  getEncryptionKeyWithBiometric,
  saveEncryptionKeyWithBiometric,
} from "../biometric";
import { useBiometricAuthSettingsStore } from "../store/biometric-auth-settings-store";
import { useLang } from "@/modules/lang";
import { SettingsCard } from "@/modules/settings";
import { useVaultCredentialsStore } from "@/modules/vault";
import { Switch } from "@/ui";
import { FingerprintIcon } from "@/ui/icons";

export function BiometricAuthSettingsCard() {
  const lang = useLang();
  const { enabled, setBiometricAuthStatus } = useBiometricAuthSettingsStore();
  const { encryptionKey } = useVaultCredentialsStore();

  const handleOnEnabledChange = useCallback(
    async (enabled: boolean) => {
      if (enabled) {
        if (encryptionKey === null) {
          return;
        }
        await saveEncryptionKeyWithBiometric(
          encryptionKey,
          lang.biometricAuth.authPrompt,
        );
        // Validate whether an user authenticated successfully
        const savedEncryptionKey = await getEncryptionKeyWithBiometric(
          lang.biometricAuth.authPrompt,
        );
        if (!savedEncryptionKey?.equals(encryptionKey)) {
          return;
        }
      }
      setBiometricAuthStatus(enabled);
    },
    [encryptionKey, setBiometricAuthStatus, lang.biometricAuth.authPrompt],
  );

  return (
    <SettingsCard
      leftIcon={<FingerprintIcon size="md" />}
      text={lang.settings.authSection.useBiometricAuthCardText}
      rightAction={
        <Switch size="md" enabled={enabled} onChange={handleOnEnabledChange} />
      }
      onPress={() => handleOnEnabledChange(!enabled)}
    />
  );
}
