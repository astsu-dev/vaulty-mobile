import { Buffer } from "@craftzdog/react-native-buffer";
import { createContext } from "react";
import { MMKV } from "react-native-mmkv";
import crypto from "react-native-quick-crypto";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { Password, PasswordCreate } from "./password";
import { createZustandStorageFromEncryptedMMKV } from "@/utils/storage";

const STORAGE_ID = "password-store";

export type PasswordStoreState = {
  passwords: Password[];
};

export type PasswordStoreActions = {
  addPassword(passwordCreate: PasswordCreate): Password;
  getPassword(id: string): Password | null;
  updatePassword(id: string, passwordCreate: PasswordCreate): void;
  deletePassword(id: string): void;
  clearPasswords(): void;
  setPasswords(passwords: Password[]): void;
};

const initialState: PasswordStoreState = {
  passwords: [],
};

function trimPassword<T extends PasswordCreate>(password: T): T {
  return {
    ...password,
    name: password.name.trim(),
    username: password.username.trim(),
    email: password.email.trim(),
    website: password.website.trim(),
    notes: password.notes.trim(),
  };
}

export function createPasswordStore(key: Buffer) {
  const storage = new MMKV({ id: STORAGE_ID });

  return createStore<PasswordStoreState & PasswordStoreActions>()(
    persist(
      (set, get) => ({
        ...initialState,
        addPassword(passwordCreate) {
          const password: Password = trimPassword({
            ...passwordCreate,
            id: crypto.randomUUID(),
          });
          set((state) => ({ passwords: [...state.passwords, password] }));
          return password;
        },
        getPassword(id) {
          return get().passwords.find((password) => password.id === id) ?? null;
        },
        updatePassword(id, passwordCreate) {
          set((state) => ({
            passwords: state.passwords.map((password) =>
              password.id === id
                ? trimPassword({
                    ...password,
                    ...passwordCreate,
                  })
                : password,
            ),
          }));
        },
        deletePassword(id) {
          set((state) => ({
            passwords: state.passwords.filter((password) => password.id !== id),
          }));
        },
        clearPasswords() {
          set({ passwords: [] });
        },
        setPasswords(passwords) {
          set({ passwords });
        },
      }),
      {
        version: 0,
        name: STORAGE_ID,
        storage: createZustandStorageFromEncryptedMMKV(storage, key),
      },
    ),
  );
}

export type PasswordStore = ReturnType<typeof createPasswordStore>;

export const PasswordStoreContext = createContext<PasswordStore | null>(null);

export function deletePasswordStorage() {
  const storage = new MMKV({ id: STORAGE_ID });
  for (const key of storage.getAllKeys()) {
    storage.delete(key);
  }
}
