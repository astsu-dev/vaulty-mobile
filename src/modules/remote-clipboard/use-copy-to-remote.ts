import { useCallback } from "react";
import Toast from "react-native-toast-message";
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
        Toast.show({
          type: "neutral",
          text1: lang.copyToast.copied,
        });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: lang.errors.createUnexpectedErrorText(err),
        });
      }
    },
    [port, password, lang],
  );

  return copyToRemote;
}
