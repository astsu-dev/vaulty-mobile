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
import { InvalidKeyError, decrypt, encrypt, pbkdf2 } from "@/utils/crypto";

export function useDeleteVault() {
  const { clearPasswordStore } = usePasswordStoreContainerStore((state) => ({
    clearPasswordStore: state.clearPasswordStore,
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
    clearTestString();
    clearEncryptionKey();
  }, [clearPasswordStore, clearTestString, clearEncryptionKey]);

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
      setEncryptionKey(key);
    },
    [setPasswordStore, setEncryptionKey, testString],
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
  const { setEncryptionKey } = useVaultCredentialsStore((state) => ({
    setEncryptionKey: state.setEncryptionKey,
  }));

  const createVault = useCallback(
    async (password: string) => {
      // Setup vault
      const key = await pbkdf2(password);
      setTestString(await encrypt(TEST_STRING, key));
      setPasswordStore(createPasswordStore(key));
      setEncryptionKey(key);
    },
    [setTestString, setPasswordStore, setEncryptionKey],
  );

  return createVault;
}

export function useReplaceVault() {
  const { setPasswordStore } = usePasswordStoreContainerStore((state) => ({
    setPasswordStore: state.setPasswordStore,
  }));
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
      setTestString(await encrypt(TEST_STRING, encryptionKey));
      setEncryptionKey(encryptionKey);
    },
    [setTestString, setPasswordStore, setEncryptionKey],
  );

  return replaceVault;
}

export function useChangeVaultPassword() {
  const { passwordStore, setPasswordStore } = usePasswordStoreContainerStore();
  const { setTestString } = useVaultMetadataStore((state) => ({
    setTestString: state.setTestString,
  }));
  const { setEncryptionKey } = useVaultCredentialsStore((state) => ({
    setEncryptionKey: state.setEncryptionKey,
  }));

  if (passwordStore === null) {
    throw new Error("Password store is not set");
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
      setTestString(await encrypt(TEST_STRING, newKey));
      setEncryptionKey(newKey);
    },
    [passwordStore, setPasswordStore, setTestString, setEncryptionKey],
  );

  return changeVaultPassword;
}
