import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorageFromMMKV } from "@/utils/storage";

const STORAGE_ID = "appearance-settings";
const appearanceSettingsMMKV = new MMKV({ id: STORAGE_ID });

export enum PasswordNameTruncateStyle {
  FROM_LEFT = "FROM_LEFT",
  FROM_RIGHT = "FROM_RIGHT",
}

export type AppearanceSettingsStoreState = {
  passwordNameTruncateStyle: PasswordNameTruncateStyle;
};

export type AppearanceSettingsStoreActions = {
  setPasswordNameTruncateStyle: (style: PasswordNameTruncateStyle) => void;
};

export const useAppearanceSettingsStore = create<
  AppearanceSettingsStoreState & AppearanceSettingsStoreActions
>()(
  persist(
    (set) => ({
      passwordNameTruncateStyle: PasswordNameTruncateStyle.FROM_RIGHT,
      setPasswordNameTruncateStyle: (style) =>
        set({ passwordNameTruncateStyle: style }),
    }),
    {
      name: STORAGE_ID,
      storage: createZustandStorageFromMMKV(appearanceSettingsMMKV),
    },
  ),
);
