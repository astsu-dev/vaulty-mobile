import { Buffer } from "@craftzdog/react-native-buffer";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import {
  BACKUP_SCHEMAS,
  BackupType,
  BackupVersion,
  LatestBackupType,
} from "./schema";
import { decrypt } from "@/utils/crypto";

const backupMigrations: Record<
  BackupVersion,
  (backup: BackupType) => BackupType
> = {
  1: (backup) => backup,
};

export class InvalidKeyOrCorruptedBackupError extends Error {
  constructor() {
    super("Invalid key or corrupted backup");
  }
}

export class BackupFilePickCancelledError extends Error {
  constructor() {
    super("Backup file pick cancelled");
  }
}

function validateBackup(backup: unknown): BackupType {
  for (const schema of BACKUP_SCHEMAS) {
    const result = schema.safeParse(backup);
    if (result.success) {
      return result.data;
    }
  }
  throw new InvalidKeyOrCorruptedBackupError();
}

function migrateBackup(backup: BackupType): LatestBackupType {
  while (backupMigrations[(backup.version + 1) as BackupVersion]) {
    backup = backupMigrations[(backup.version + 1) as BackupVersion](backup);
  }
  return backup;
}

export async function getBackupFromFile(
  fileUri: string,
  encryptionKey: Buffer,
): Promise<LatestBackupType> {
  const encryptedData = await FileSystem.readAsStringAsync(fileUri);
  const decryptedData = await decrypt(encryptedData, encryptionKey);

  let backup: unknown;
  try {
    backup = JSON.parse(decryptedData);
  } catch {
    throw new InvalidKeyOrCorruptedBackupError();
  }

  return migrateBackup(validateBackup(backup));
}

export async function pickBackupFile(): Promise<string> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled) {
    throw new BackupFilePickCancelledError();
  }

  return result.assets[0].uri;
}
