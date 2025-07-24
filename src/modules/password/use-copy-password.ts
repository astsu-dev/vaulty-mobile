import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { clearClipboardWithTimeout } from "@/modules/clipboard";
import { useLang } from "@/modules/lang";
import { useCopyToRemote } from "@/modules/remote-clipboard";

export const CLEAR_PASSWORD_FROM_CLIPBOARD_TIMEOUT = 60000;

export function useCopyPassword() {
  const lang = useLang();

  const copyPassword = useCallback(
    async (password: string) => {
      await Clipboard.setStringAsync(password);
      Toast.show({
        type: "neutral",
        text1: lang.copyToast.copied,
      });
      try {
        await clearClipboardWithTimeout({
          timeout: CLEAR_PASSWORD_FROM_CLIPBOARD_TIMEOUT,
          notification: {
            title: lang.clearPasswordFromClipboardNotification.title,
            description:
              lang.clearPasswordFromClipboardNotification.description(
                Math.floor(CLEAR_PASSWORD_FROM_CLIPBOARD_TIMEOUT / 1000),
              ),
          },
        });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: lang.errors.createUnexpectedErrorText(err),
        });
      }
    },
    [lang],
  );

  return copyPassword;
}

export function useCopyPasswordToRemote() {
  const copyToRemote = useCopyToRemote();

  const copyPasswordToRemote = useCallback(
    async (password: string) => {
      await copyToRemote(
        password,
        CLEAR_PASSWORD_FROM_CLIPBOARD_TIMEOUT / 1000,
      );
    },
    [copyToRemote],
  );

  return copyPasswordToRemote;
}
