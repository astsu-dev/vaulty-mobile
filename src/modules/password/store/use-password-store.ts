import { createStore, useStore } from "zustand";
import {
  PasswordStore,
  PasswordStoreActions,
  PasswordStoreState,
  passwordStoreStateCreator,
} from "./password-store";
import { usePasswordStoreContainerStore } from "./password-store-container-store";

export function usePasswordStore<T>(
  selector: (state: PasswordStoreState & PasswordStoreActions) => T,
): T {
  let { passwordStore } = usePasswordStoreContainerStore();

  if (!passwordStore) {
    passwordStore = createStore<PasswordStoreActions & PasswordStoreState>()(
      passwordStoreStateCreator,
    ) as unknown as PasswordStore;
  }

  return useStore(passwordStore, selector);
}
