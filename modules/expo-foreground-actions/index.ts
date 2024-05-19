import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
  Platform,
} from "expo-modules-core";
import { AppRegistry, AppState } from "react-native";
import {
  ExpireEventPayload,
  AndroidSettings,
  ForegroundApi,
  Settings,
} from "./src/ExpoForegroundActions.types";
import ExpoForegroundActionsModule from "./src/ExpoForegroundActionsModule";
export * from "./src/ExpoForegroundActions.types";

const emitter = new EventEmitter(
  ExpoForegroundActionsModule ?? NativeModulesProxy.ExpoForegroundActions,
);

let ranTaskCount: number = 0;

export class NotForegroundedError extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = "NotForegroundedError"; // (2)
  }
}

const startForegroundAction = async (
  options?: AndroidSettings,
): Promise<number> => {
  if (Platform.OS === "android" && !options) {
    throw new Error("Foreground action options cannot be null on android");
  }
  if (Platform.OS === "android") {
    return ExpoForegroundActionsModule.startForegroundAction(options);
  } else {
    return ExpoForegroundActionsModule.startForegroundAction();
  }
};

// Get the native constant value.
export const runForegroundedAction = async (
  act: (api: ForegroundApi) => Promise<void>,
  androidSettings: AndroidSettings,
  settings: Settings = { runInJS: false },
): Promise<void> => {
  if (!androidSettings) {
    throw new Error("Foreground action options cannot be null");
  }

  if (AppState.currentState === "background") {
    throw new NotForegroundedError(
      "Foreground actions can only be run in the foreground",
    );
  }

  const headlessTaskName = `${androidSettings.headlessTaskName}${ranTaskCount}`;

  const initOptions = { ...androidSettings, headlessTaskName };
  const action = async (identifier: number) => {
    if (AppState.currentState === "background") {
      throw new NotForegroundedError(
        "Foreground actions can only be run in the foreground",
      );
    }
    await act({
      headlessTaskName,
      identifier,
    });
  };
  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    throw new Error(
      "Unsupported platform, currently only ios and android are supported",
    );
  }

  ranTaskCount++;

  /*On android we wrap the headless task in a promise so we can "await" the starter*/
  await runAndroid(action, initOptions, settings);
  return;
};

const runAndroid = async (
  action: (identifier: number) => Promise<void>,
  options: AndroidSettings,
  settings: Settings,
) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<void>(async (resolve, reject) => {
    try {
      /*First we register the headless task so we can run it from the Foreground service*/
      AppRegistry.registerHeadlessTask(
        options.headlessTaskName,
        () => async (taskdata: { notificationId: number }) => {
          const { notificationId } = taskdata;
          /*Then we start the actuall foreground action, we all do this in the headless task, without touching UI, we can still update UI be using something like Realm for example*/
          try {
            settings?.events?.onIdentifier?.(notificationId);
            await action(notificationId);
            await stopForegroundAction(notificationId);
            resolve();
          } catch (e) {
            /*We do this to make sure its ALWAYS stopped*/
            await stopForegroundAction(notificationId);
            throw e;
          }
        },
      );
      await startForegroundAction(options);
    } catch (e) {
      reject(e);
      throw e;
    }
  });

export const updateForegroundedAction = async (
  id: number,
  options: AndroidSettings,
) => {
  if (Platform.OS !== "android") return;
  return ExpoForegroundActionsModule.updateForegroundedAction(id, options);
};

// noinspection JSUnusedGlobalSymbols
export const stopForegroundAction = async (id: number): Promise<void> => {
  await ExpoForegroundActionsModule.stopForegroundAction(id);
};

// noinspection JSUnusedGlobalSymbols
export const forceStopAllForegroundActions = async (): Promise<void> => {
  await ExpoForegroundActionsModule.forceStopAllForegroundActions();
};

// noinspection JSUnusedGlobalSymbols
export const getForegroundIdentifiers = async (): Promise<number> =>
  ExpoForegroundActionsModule.getForegroundIdentifiers();
// noinspection JSUnusedGlobalSymbols
export const getRanTaskCount = () => ranTaskCount;

export const getBackgroundTimeRemaining = async (): Promise<number> => {
  if (Platform.OS !== "ios") return -1;
  return await ExpoForegroundActionsModule.getBackgroundTimeRemaining();
};

export function addExpirationListener(
  listener: (event: ExpireEventPayload) => void,
): Subscription {
  return emitter.addListener("onExpirationEvent", listener);
}
