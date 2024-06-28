import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language } from "../language";
import { createZustandStorageFromMMKV } from "@/utils/storage";

const STORAGE_ID = "language-store";
const languageMMKV = new MMKV({ id: STORAGE_ID });

type LanguageStoreState = {
  language: Language;
};

type LanguageStoreActions = {
  setLanguage: (language: Language) => void;
};

export const useLangStore = create<LanguageStoreState & LanguageStoreActions>()(
  persist(
    (set) => ({
      language: Language.EN,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: STORAGE_ID,
      storage: createZustandStorageFromMMKV(languageMMKV),
    },
  ),
);
