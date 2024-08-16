import { useCallback } from "react";
import { ToastAndroid } from "react-native";
import { RemoteClipboardAPI } from "./remote-clipboard-api";
import { useRemoteClipboardSettingsStore } from "./store/use-remote-clipboard-settings-store";
import { useLang } from "@/modules/lang";

export function useCopyToRemote() {
  const lang = useLang();
  const { port, password } = useRemoteClipboardSettingsStore((state) => ({
    port: state.port,
    password: state.password,
  }));

  const copyToRemote = useCallback(
    async (text: string, expiresIn?: number) => {
      try {
        await RemoteClipboardAPI.setClipboard(port, password, text, expiresIn);
        ToastAndroid.show(lang.copyToast.copied, ToastAndroid.SHORT);
      } catch (err) {
        ToastAndroid.show(
          lang.errors.createUnexpectedErrorText(err),
          ToastAndroid.SHORT,
        );
      }
    },
    [port, password, lang],
  );

  return copyToRemote;
}
