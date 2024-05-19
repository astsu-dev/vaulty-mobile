/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line no-undef
const { withAndroidManifest, AndroidConfig } = require("expo/config-plugins");
const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

// eslint-disable-next-line no-undef
module.exports = function withBackgroundActions(config) {
  return withAndroidManifest(config, async (config) => {
    const application = getMainApplicationOrThrow(config.modResults);
    const service = application.service ? application.service : [];

    config.modResults = {
      manifest: {
        ...config.modResults.manifest,
        application: [
          {
            ...application,
            service: [
              ...service,
              {
                $: {
                  "android:name":
                    "expo.modules.foregroundactions.ExpoForegroundActionsService",
                  "android:foregroundServiceType": "dataSync",
                },
              },
            ],
          },
        ],
      },
    };

    return config;
  });
};
