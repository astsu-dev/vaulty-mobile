export type RootStackParamList = {
  Welcome: undefined;
  CreateVault: undefined;
  MyPasswords: undefined;
  UnlockVault: { skipBiometric?: boolean };
  AddPassword: undefined;
  PasswordOverview: { id: string };
  Settings: undefined;
  ImportBackup: undefined;
  ChangeVaultPassword: undefined;
  RemoteClipboardSettings: undefined;
};
