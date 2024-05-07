import { z } from "zod";

export type BackupVersion = 1;

const v1BackupSchema = z.object({
  version: z.literal(1),
  passwords: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      password: z.string(),
      username: z.string(),
      email: z.string(),
      website: z.string(),
      notes: z.string(),
    }),
  ),
  timestamp: z.number().int().positive(),
});
type V1BackupType = z.infer<typeof v1BackupSchema>;

export const BACKUP_SCHEMAS = [v1BackupSchema];
export type BackupType = V1BackupType;
export type LatestBackupType = V1BackupType;
