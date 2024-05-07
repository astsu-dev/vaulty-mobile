import { useStore } from "zustand";
import { PasswordStoreActions, PasswordStoreState } from "./password-store";
import { usePasswordStoreContainerStore } from "./password-store-container-store";

export function usePasswordStore<T>(
  selector: (state: PasswordStoreState & PasswordStoreActions) => T,
): T {
  const { passwordStore } = usePasswordStoreContainerStore();

  if (!passwordStore) {
    throw new Error("Password store not set in container store.");
  }

  return useStore(passwordStore, selector);
}
