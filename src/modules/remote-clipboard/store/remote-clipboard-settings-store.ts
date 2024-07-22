import { Buffer } from "@craftzdog/react-native-buffer";
import { createContext } from "react";
import { MMKV } from "react-native-mmkv";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorageFromEncryptedMMKV } from "@/utils/storage";

const STORAGE_ID = "remote-clipboard-settings";

export type RemoteClipboardSettingsStoreState = {
  /** Whether the remote clipboard feature is enabled. */
  enabled: boolean;

  /** The port of the UDP remote clipboard server */
  port: number;

  /** The password to authenticate with the remote clipboard server. */
  password: string;
};

export type RemoteClipboardSettingsStoreActions = {
  setState: (state: Partial<RemoteClipboardSettingsStoreState>) => void;
};

export function createRemoteClipboardSettingsStore(key: Buffer) {
  const storage = new MMKV({ id: STORAGE_ID });

  return createStore<
    RemoteClipboardSettingsStoreState & RemoteClipboardSettingsStoreActions
  >()(
    persist(
      (set) => ({
        enabled: false,
        port: 8090,
        password: "",
        setState: set,
      }),
      {
        name: STORAGE_ID,
        storage: createZustandStorageFromEncryptedMMKV(storage, key),
      },
    ),
  );
}

export type RemoteClipboardSettingsStore = ReturnType<
  typeof createRemoteClipboardSettingsStore
>;

export const RemoteClipboardSettingsStoreContext =
  createContext<RemoteClipboardSettingsStore | null>(null);

export function deleteRemoteClipboardSettingsStorage() {
  const storage = new MMKV({ id: STORAGE_ID });
  for (const key of storage.getAllKeys()) {
    storage.delete(key);
  }
}
