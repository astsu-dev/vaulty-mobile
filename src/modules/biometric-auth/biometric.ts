import { Buffer } from "@craftzdog/react-native-buffer";
import * as SecureStore from "expo-secure-store";

const SECURE_STORE_KEY_FOR_ENCRYPTION_KEY = "encryptionKey";

// Saves an encryption key in base64 encoding in the secure store with biometric auth
export async function saveEncryptionKeyWithBiometric(
  key: Buffer,
  authPrompt: string,
): Promise<void> {
  // Guard to handle the situation when we forgot to check whether biometric auth is available
  if (SecureStore.canUseBiometricAuthentication()) {
    await SecureStore.setItemAsync(
      SECURE_STORE_KEY_FOR_ENCRYPTION_KEY,
      key.toString("base64"),
      { requireAuthentication: true, authenticationPrompt: authPrompt },
    );
  }
}

// Gets an encryption key from the secure store with biometric auth.
// If key does not exist in the secure store or an user is not authenticated returns null
export async function getEncryptionKeyWithBiometric(
  authPrompt: string,
): Promise<Buffer | null> {
  const result = await SecureStore.getItemAsync(
    SECURE_STORE_KEY_FOR_ENCRYPTION_KEY,
    {
      requireAuthentication: true,
      authenticationPrompt: authPrompt,
    },
  );
  if (result === null) {
    return null;
  }
  return Buffer.from(result, "base64");
}
