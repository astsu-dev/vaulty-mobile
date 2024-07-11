import { create } from "zustand";
import { RemoteClipboardSettingsStore } from "./remote-clipboard-settings-store";

export type RemoteClipboardSettingsContainerStoreState = {
  remoteClipboardSettingsStore: RemoteClipboardSettingsStore | null;
};

export type RemoteClipboardSettingsContainerStoreActions = {
  setRemoteClipboardSettingsStore(
    remoteClipboardSettingsStore: RemoteClipboardSettingsStore,
  ): void;
  clearRemoteClipboardSettingsStore(): void;
};

export const useRemoteClipboardSettingsContainerStore = create<
  RemoteClipboardSettingsContainerStoreState &
    RemoteClipboardSettingsContainerStoreActions
>()((set) => ({
  remoteClipboardSettingsStore: null,
  setRemoteClipboardSettingsStore(remoteClipboardSettingsStore) {
    set({ remoteClipboardSettingsStore: remoteClipboardSettingsStore });
  },
  clearRemoteClipboardSettingsStore() {
    set({ remoteClipboardSettingsStore: null });
  },
}));
