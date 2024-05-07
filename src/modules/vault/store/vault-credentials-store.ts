import { Buffer } from "@craftzdog/react-native-buffer";
import { create } from "zustand";

export type VaultCredentialsStoreState = {
  encryptionKey: Buffer | null;
};

export type VaultCredentialsStoreActions = {
  setEncryptionKey: (key: Buffer) => void;
  clearEncryptionKey: () => void;
};

export const useVaultCredentialsStore = create<
  VaultCredentialsStoreState & VaultCredentialsStoreActions
>()((set) => ({
  encryptionKey: null,
  setEncryptionKey: (key) => set({ encryptionKey: key }),
  clearEncryptionKey: () => set({ encryptionKey: null }),
}));
