import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";
import { ToastAndroid } from "react-native";
import { clearClipboardWithTimeout } from "@/modules/clipboard";
import { useLang } from "@/modules/lang";

export const CLEAR_PASSWORD_FROM_CLIPBOARD_TIMEOUT = 60000;

export function useCopyPassword() {
  const lang = useLang();

  const copyPassword = useCallback(
    async (password: string) => {
      await Clipboard.setStringAsync(password);
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
        ToastAndroid.show(
          lang.errors.createUnexpectedErrorText(err),
          ToastAndroid.SHORT,
        );
      }
    },
    [lang],
  );

  return copyPassword;
}
