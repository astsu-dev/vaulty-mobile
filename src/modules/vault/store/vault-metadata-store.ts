import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorageFromMMKV } from "@/utils/storage";

export const TEST_STRING = "test";
const STORAGE_ID = "vault-metadata";
const vaultMetadataMMKV = new MMKV({ id: STORAGE_ID });

type VaultMetadataStoreState = {
  testString: string | null;
};

type VaultMetadataStoreActions = {
  setTestString(string: string): void;
  clearTestString(): void;
};

const initialState: VaultMetadataStoreState = {
  testString: null,
};

export const useVaultMetadataStore = create<
  VaultMetadataStoreState & VaultMetadataStoreActions
>()(
  persist(
    (set) => ({
      ...initialState,
      setTestString(string) {
        set({ testString: string });
      },
      clearTestString() {
        set({ testString: null });
      },
    }),
    {
      name: STORAGE_ID,
      storage: createZustandStorageFromMMKV(vaultMetadataMMKV),
    },
  ),
);
