import { create } from "zustand";
import { PasswordStore } from "./password-store";

export type PasswordStoreContainerStoreState = {
  passwordStore: PasswordStore | null;
};

export type PasswordStoreContainerStoreActions = {
  setPasswordStore(passwordStore: PasswordStore): void;
  clearPasswordStore(): void;
};

export const usePasswordStoreContainerStore = create<
  PasswordStoreContainerStoreState & PasswordStoreContainerStoreActions
>()((set) => ({
  passwordStore: null,
  setPasswordStore(passwordStore) {
    set({ passwordStore });
  },
  clearPasswordStore() {
    set({ passwordStore: null });
  },
}));
