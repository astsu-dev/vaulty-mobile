import { create } from "zustand";

type BackupFileStoreState = {
  backupFileUri: string | null;
};

type BackupFileStoreActions = {
  setBackupFileUri: (fileUri: string) => void;
  clearBackupFileUri: () => void;
};

export const useBackupFileStore = create<
  BackupFileStoreState & BackupFileStoreActions
>()((set) => ({
  backupFileUri: null,
  setBackupFileUri: (fileUri) => set({ backupFileUri: fileUri }),
  clearBackupFileUri: () => set({ backupFileUri: null }),
}));
