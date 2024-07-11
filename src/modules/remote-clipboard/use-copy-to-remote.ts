import { useCallback } from "react";
import { ToastAndroid } from "react-native";
import { RemoteClipboardAPI } from "./remote-clipboard-api";
import { useRemoteClipboardSettingsStore } from "./store/use-remote-clipboard-settings-store";
import { useLang } from "@/modules/lang";

export function useCopyToRemote() {
  const lang = useLang();
  const { port, apiKey } = useRemoteClipboardSettingsStore((state) => ({
    port: state.port,
    apiKey: state.apiKey,
  }));

  const copyToRemote = useCallback(
    async (text: string, expiresIn?: number) => {
      try {
        await RemoteClipboardAPI.setClipboard(port, apiKey, text, expiresIn);
        ToastAndroid.show(
          lang.copyToRemote.successfullyCopied,
          ToastAndroid.SHORT,
        );
      } catch (err) {
        ToastAndroid.show(
          lang.errors.createUnexpectedErrorText(err),
          ToastAndroid.SHORT,
        );
      }
    },
    [port, apiKey, lang],
  );

  return copyToRemote;
}
