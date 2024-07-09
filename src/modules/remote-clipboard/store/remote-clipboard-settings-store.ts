import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorageFromMMKV } from "@/utils/storage";

const STORAGE_ID = "remote-clipboard-settings";
const remoteClipboardSettingsMMKV = new MMKV({ id: STORAGE_ID });

export type RemoteClipboardSettingsStoreState = {
  /** Whether the remote clipboard feature is enabled. */
  enabled: boolean;

  /** The URL to the remote clipboard server. */
  url: string;

  /** The API key to authenticate with the remote clipboard server. */
  apiKey: string;
};

export type RemoteClipboardSettingsStoreActions = {
  setState: (state: Partial<RemoteClipboardSettingsStoreState>) => void;
};

export const useRemoteClipboardSettingsStore = create<
  RemoteClipboardSettingsStoreState & RemoteClipboardSettingsStoreActions
>()(
  persist(
    (set) => ({
      enabled: false,
      url: "",
      apiKey: "",
      setState: set,
    }),
    {
      name: STORAGE_ID,
      storage: createZustandStorageFromMMKV(remoteClipboardSettingsMMKV),
    },
  ),
);
