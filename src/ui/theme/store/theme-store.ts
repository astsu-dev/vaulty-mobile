import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorageFromMMKV } from "@/utils/storage";

const STORAGE_ID = "theme-store";
const themeMMKV = new MMKV({ id: STORAGE_ID });

type ThemeStoreState = {
  theme: "light" | "dark" | "system";
};

type ThemeStoreActions = {
  setTheme: (theme: "light" | "dark" | "system") => void;
};

export const useThemeStore = create<ThemeStoreState & ThemeStoreActions>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: STORAGE_ID,
      storage: createZustandStorageFromMMKV(themeMMKV),
    },
  ),
);
