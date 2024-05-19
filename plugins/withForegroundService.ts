import { ConfigPlugin, withAndroidManifest } from "expo/config-plugins";

const withForegroundService: ConfigPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    if (!config.modResults) {
      throw new Error("withForegroundService: mods are not set for android");
    }

    const manifest = config.modResults.manifest;

    const mainApplication = manifest.application?.[0];
    if (!mainApplication) {
      throw new Error(
        "withForegroundService: no application in the android manifest",
      );
    }

    mainApplication.service = mainApplication.service ?? [];
    mainApplication.service.push({
      $: {
        "android:name": "app.notifee.core.ForegroundService",
        // @ts-expect-error: expo type does not support`foregroundServiceType` is not a valid attribute
        "android:foregroundServiceType": "dataSync",
      },
    });

    manifest["uses-permission"] = manifest["uses-permission"] ?? [];
    manifest["uses-permission"].push(
      {
        $: {
          "android:name": "android.permission.FOREGROUND_SERVICE",
        },
      },
      {
        $: {
          "android:name": "android.permission.FOREGROUND_SERVICE_DATA_SYNC",
        },
      },
    );

    return config;
  });
};

export default withForegroundService;
