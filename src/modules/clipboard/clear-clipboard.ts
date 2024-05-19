import * as Clipboard from "expo-clipboard";
import * as Notifications from "expo-notifications";
import * as ForegroundActions from "@modules/expo-foreground-actions";

export type ClearClipboardWithTimeoutOptions = {
  /**
   * The timeout in milliseconds before the clipboard is cleared.
   */
  timeout: number;

  /**
   * The notification title and description.
   */
  notification: {
    title: string;
    description: string;
  };

  /**
   * The number of times to clear the clipboard.
   * @default 20
   */
  clearTimes?: number;
};

export async function clearClipboardWithTimeout({
  notification,
  timeout,
  clearTimes = 20,
}: ClearClipboardWithTimeoutOptions) {
  await Notifications.requestPermissionsAsync();
  await ForegroundActions.runForegroundedAction(
    async () => {
      await new Promise((resolve) => setTimeout(resolve, timeout));
      for (let i = 0; i < clearTimes; i++) {
        await Clipboard.setStringAsync("");
      }
    },
    {
      headlessTaskName: "clear-clipboard",
      notificationTitle: notification.title,
      notificationDesc: notification.description,
      notificationIconName: "ic_launcher_foreground",
      notificationIconType: "mipmap",
      linkingURI: "vaulty://",
    },
  );
}
