import { createStore, useStore } from "zustand";
import { useRemoteClipboardSettingsContainerStore } from "./remote-clipboard-settings-container-store";
import {
  RemoteClipboardSettingsStore,
  RemoteClipboardSettingsStoreActions,
  RemoteClipboardSettingsStoreState,
  remoteClipboardSettingsStoreCreator,
} from "./remote-clipboard-settings-store";

export function useRemoteClipboardSettingsStore<T>(
  selector: (
    state: RemoteClipboardSettingsStoreState &
      RemoteClipboardSettingsStoreActions,
  ) => T,
): T {
  let { remoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore();

  if (!remoteClipboardSettingsStore) {
    remoteClipboardSettingsStore = createStore<
      RemoteClipboardSettingsStoreState & RemoteClipboardSettingsStoreActions
    >()(
      remoteClipboardSettingsStoreCreator,
    ) as unknown as RemoteClipboardSettingsStore;
  }

  return useStore(remoteClipboardSettingsStore, selector);
}
