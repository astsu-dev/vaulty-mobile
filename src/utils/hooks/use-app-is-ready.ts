import { create } from "zustand";

export type AppIsReadyStoreState = {
  /** Whether the app is ready to be used and splash screen can be hidden */
  appIsReady: boolean;
};

export type AppIsReadyStoreActions = {
  setAppIsReady: (isReady: boolean) => void;
};

export const useAppIsReadyStore = create<
  AppIsReadyStoreState & AppIsReadyStoreActions
>((set) => ({
  appIsReady: false,
  setAppIsReady: (appIsReady) => set({ appIsReady }),
}));

export const useAppIsReady = () =>
  useAppIsReadyStore((state) => state.appIsReady);
