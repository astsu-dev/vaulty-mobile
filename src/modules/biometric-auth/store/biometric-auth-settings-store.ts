import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorageFromMMKV } from "@/utils/storage";

const STORAGE_ID = "biometric-auth-settings";
const biometricAuthSettingsMMKV = new MMKV({ id: STORAGE_ID });

type BiometricAuthSettingsStoreState = {
  enabled: boolean;
};

type BiometricAuthSettingsStoreActions = {
  setBiometricAuthStatus(enabled: boolean): void;
};

const initialState: BiometricAuthSettingsStoreState = {
  enabled: false,
};

export const useBiometricAuthSettingsStore = create<
  BiometricAuthSettingsStoreState & BiometricAuthSettingsStoreActions
>()(
  persist(
    (set) => ({
      ...initialState,
      setBiometricAuthStatus(enabled) {
        set({ enabled: enabled });
      },
    }),
    {
      name: STORAGE_ID,
      storage: createZustandStorageFromMMKV(biometricAuthSettingsMMKV),
    },
  ),
);
