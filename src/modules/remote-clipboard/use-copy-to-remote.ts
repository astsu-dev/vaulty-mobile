import { useCallback } from "react";
import { ToastAndroid } from "react-native";
import { RemoteClipboardAPI } from "./remote-clipboard-api";
import { useRemoteClipboardSettingsStore } from "./store/remote-clipboard-settings-store";
import { useLang } from "@/modules/lang";

export function useCopyToRemote() {
  const lang = useLang();
  const { url, apiKey } = useRemoteClipboardSettingsStore((state) => ({
    url: state.url,
    apiKey: state.apiKey,
  }));

  const copyToRemote = useCallback(
    async (text: string, expiresIn?: number) => {
      try {
        await RemoteClipboardAPI.setClipboard(url, apiKey, text, expiresIn);
      } catch (err) {
        ToastAndroid.show(
          lang.errors.createUnexpectedErrorText(err),
          ToastAndroid.SHORT,
        );
      }
    },
    [url, apiKey, lang],
  );

  return copyToRemote;
}
