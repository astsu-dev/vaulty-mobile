import { useStore } from "zustand";
import { useRemoteClipboardSettingsContainerStore } from "./remote-clipboard-settings-container-store";
import {
  RemoteClipboardSettingsStoreActions,
  RemoteClipboardSettingsStoreState,
} from "./remote-clipboard-settings-store";

export function useRemoteClipboardSettingsStore<T>(
  selector: (
    state: RemoteClipboardSettingsStoreState &
      RemoteClipboardSettingsStoreActions,
  ) => T,
): T {
  const { remoteClipboardSettingsStore } =
    useRemoteClipboardSettingsContainerStore();

  if (!remoteClipboardSettingsStore) {
    throw new Error(
      "Remote clipboard settings store not set in container store.",
    );
  }

  return useStore(remoteClipboardSettingsStore, selector);
}
