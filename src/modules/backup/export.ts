import { Buffer } from "@craftzdog/react-native-buffer";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { LatestBackupType } from "./schema";
import { Password } from "@/modules/password";
import { encrypt } from "@/utils/crypto";

export class UnavailableSharingError extends Error {
  constructor() {
    super("Sharing is not available on this platform");
  }
}

export async function exportBackup(
  passwords: Password[],
  encryptionKey: Buffer,
) {
  if (!(await Sharing.isAvailableAsync())) {
    throw new UnavailableSharingError();
  }

  const now = new Date();
  const backup: LatestBackupType = {
    version: 1,
    passwords,
    timestamp: now.getTime(),
  };
  const data = JSON.stringify(backup);
  const encryptedData = await encrypt(data, encryptionKey);

  const fileUri =
    FileSystem.documentDirectory + `vaulty-backup-${now.toISOString()}`;
  await FileSystem.writeAsStringAsync(fileUri, encryptedData);

  try {
    await Sharing.shareAsync(fileUri);
  } finally {
    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  }
}
