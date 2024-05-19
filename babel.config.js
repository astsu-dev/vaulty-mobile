// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            crypto: "react-native-quick-crypto",
            stream: "readable-stream",
            buffer: "@craftzdog/react-native-buffer",
          },
        },
      ],
    ],
  };
};
