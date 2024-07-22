import { Buffer } from "@craftzdog/react-native-buffer";
import { useCallback } from "react";
import { useVaultCredentialsStore } from "./store/vault-credentials-store";
import {
  TEST_STRING,
  useVaultMetadataStore,
} from "./store/vault-metadata-store";
import {
  Password,
  createPasswordStore,
  deletePasswordStorage,
  usePasswordStoreContainerStore,
} from "@/modules/password";
import {
  createRemoteClipboardSettingsStore,
  deleteRemoteClipboardSettingsStorage,
  useRemoteClipboardSettingsContainerStore,
} from "@/modules/remote-clipboard";
import { InvalidKeyError, decrypt, encrypt, pbkdf2 } from "@/utils/crypto";

export function useDeleteVault() {
  const { clearPasswordStore } = usePasswordStoreContainerStore((state) => ({
    clearPasswordStore: state.clearPasswordStore,
  }));
  const { clearRemoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore((state) => ({
      clearRemoteClipboardSettingsStore:
        state.clearRemoteClipboardSettingsStore,
    }));
  const { clearTestString } = useVaultMetadataStore((state) => ({
    clearTestString: state.clearTestString,
  }));
  const { clearEncryptionKey } = useVaultCredentialsStore((state) => ({
    clearEncryptionKey: state.clearEncryptionKey,
  }));

  const deleteVault = useCallback(() => {
    deletePasswordStorage();
    clearPasswordStore();
    deleteRemoteClipboardSettingsStorage();
    clearRemoteClipboardSettingsStore();
    clearTestString();
    clearEncryptionKey();
  }, [
    clearPasswordStore,
    clearRemoteClipboardSettingsStore,
    clearTestString,
    clearEncryptionKey,
  ]);

  return deleteVault;
}

/** Hook to unlock the vault
 * @throws InvalidKeyError - If the entered password is incorrect
 * @returns unlockVault function
 * */
export function useUnlockVault() {
  const { setPasswordStore } = usePasswordStoreContainerStore((state) => ({
    setPasswordStore: state.setPasswordStore,
  }));
  const { setRemoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore((state) => ({
      setRemoteClipboardSettingsStore: state.setRemoteClipboardSettingsStore,
    }));
  const { setEncryptionKey } = useVaultCredentialsStore((state) => ({
    setEncryptionKey: state.setEncryptionKey,
  }));
  const { testString } = useVaultMetadataStore((state) => ({
    testString: state.testString,
  }));
  if (testString === null) {
    throw new Error("Test string is not set");
  }

  const unlockVault = useCallback(
    async (password: string) => {
      const key = await pbkdf2(password);

      // Check if the key is correct
      const decryptedTestString = await decrypt(testString, key);
      if (decryptedTestString !== TEST_STRING) {
        throw new InvalidKeyError();
      }

      setPasswordStore(createPasswordStore(key));
      setRemoteClipboardSettingsStore(createRemoteClipboardSettingsStore(key));
      setEncryptionKey(key);
    },
    [
      setPasswordStore,
      setRemoteClipboardSettingsStore,
      setEncryptionKey,
      testString,
    ],
  );

  return unlockVault;
}

export function useCreateVault() {
  const { setTestString } = useVaultMetadataStore((state) => ({
    setTestString: state.setTestString,
  }));
  const { setPasswordStore } = usePasswordStoreContainerStore((state) => ({
    setPasswordStore: state.setPasswordStore,
  }));
  const { setRemoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore((state) => ({
      setRemoteClipboardSettingsStore: state.setRemoteClipboardSettingsStore,
    }));
  const { setEncryptionKey } = useVaultCredentialsStore((state) => ({
    setEncryptionKey: state.setEncryptionKey,
  }));

  const createVault = useCallback(
    async (password: string) => {
      // Setup vault
      const key = await pbkdf2(password);
      setTestString(await encrypt(TEST_STRING, key));
      setPasswordStore(createPasswordStore(key));
      setRemoteClipboardSettingsStore(createRemoteClipboardSettingsStore(key));
      setEncryptionKey(key);
    },
    [
      setTestString,
      setPasswordStore,
      setRemoteClipboardSettingsStore,
      setEncryptionKey,
    ],
  );

  return createVault;
}

export function useReplaceVault() {
  const { setPasswordStore } = usePasswordStoreContainerStore((state) => ({
    setPasswordStore: state.setPasswordStore,
  }));
  const { remoteClipboardSettingsStore, setRemoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore();
  const { setTestString } = useVaultMetadataStore((state) => ({
    setTestString: state.setTestString,
  }));
  const { setEncryptionKey } = useVaultCredentialsStore((state) => ({
    setEncryptionKey: state.setEncryptionKey,
  }));

  const replaceVault = useCallback(
    async (passwords: Password[], encryptionKey: Buffer) => {
      deletePasswordStorage();
      const newPasswordStore = createPasswordStore(encryptionKey);
      setPasswordStore(newPasswordStore);
      newPasswordStore.setState({ passwords });

      deleteRemoteClipboardSettingsStorage();
      const newRemoteClipboardSettingsStore =
        createRemoteClipboardSettingsStore(encryptionKey);
      setRemoteClipboardSettingsStore(newRemoteClipboardSettingsStore);
      if (remoteClipboardSettingsStore !== null) {
        const remoteClipboardSettings = remoteClipboardSettingsStore.getState();
        newRemoteClipboardSettingsStore.setState({
          enabled: remoteClipboardSettings.enabled,
          port: remoteClipboardSettings.port,
          password: remoteClipboardSettings.password,
        });
      }

      setTestString(await encrypt(TEST_STRING, encryptionKey));
      setEncryptionKey(encryptionKey);
    },
    [
      setTestString,
      setPasswordStore,
      remoteClipboardSettingsStore,
      setRemoteClipboardSettingsStore,
      setEncryptionKey,
    ],
  );

  return replaceVault;
}

export function useChangeVaultPassword() {
  const { passwordStore, setPasswordStore } = usePasswordStoreContainerStore();
  const { remoteClipboardSettingsStore, setRemoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore();
  const { setTestString } = useVaultMetadataStore((state) => ({
    setTestString: state.setTestString,
  }));
  const { setEncryptionKey } = useVaultCredentialsStore((state) => ({
    setEncryptionKey: state.setEncryptionKey,
  }));

  if (passwordStore === null) {
    throw new Error("Password store is not set");
  }

  if (remoteClipboardSettingsStore === null) {
    throw new Error("Remote clipboard settings store is not set");
  }

  const changeVaultPassword = useCallback(
    async (newPassword: string) => {
      deletePasswordStorage();
      const newKey = await pbkdf2(newPassword);

      const newPasswordStore = createPasswordStore(newKey);
      setPasswordStore(newPasswordStore);
      newPasswordStore.setState({
        passwords: passwordStore.getState().passwords,
      });

      const newRemoteClipboardSettingsStore =
        createRemoteClipboardSettingsStore(newKey);
      setRemoteClipboardSettingsStore(newRemoteClipboardSettingsStore);
      const remoteClipboardSettings = remoteClipboardSettingsStore.getState();
      newRemoteClipboardSettingsStore.setState({
        enabled: remoteClipboardSettings.enabled,
        port: remoteClipboardSettings.port,
        password: remoteClipboardSettings.password,
      });

      setTestString(await encrypt(TEST_STRING, newKey));
      setEncryptionKey(newKey);
    },
    [
      passwordStore,
      setPasswordStore,
      remoteClipboardSettingsStore,
      setRemoteClipboardSettingsStore,
      setTestString,
      setEncryptionKey,
    ],
  );

  return changeVaultPassword;
}
