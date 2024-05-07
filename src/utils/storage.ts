import { Buffer } from "@craftzdog/react-native-buffer";
import { MMKV } from "react-native-mmkv";
import { createJSONStorage } from "zustand/middleware";
import { decrypt, encrypt } from "./crypto";

export function createZustandStorageFromMMKV(storage: MMKV) {
  return createJSONStorage(() => ({
    setItem: (name, value) => {
      return storage.set(name, value);
    },
    getItem: (name) => {
      const value = storage.getString(name);
      return value ?? null;
    },
    removeItem: (name) => {
      return storage.delete(name);
    },
  }));
}

export function createZustandStorageFromEncryptedMMKV(
  storage: MMKV,
  key: Buffer,
) {
  return createJSONStorage(() => ({
    setItem: async (name, value) => {
      return storage.set(name, await encrypt(value, key));
    },
    getItem: async (name) => {
      const value = storage.getString(name);

      if (value === undefined) {
        return null;
      }

      return await decrypt(value, key);
    },
    removeItem: (name) => {
      return storage.delete(name);
    },
  }));
}
