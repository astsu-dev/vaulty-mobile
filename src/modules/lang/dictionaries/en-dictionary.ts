import { LangDictionary } from "../lang-dictionary";

export const enDictionary: LangDictionary = {
  welcomeScreen: {
    greetings: "Welcome to Vaulty!",
    letsSetupYourVault: "Let's setup your vault.",
    createVaultButton: "Create a new vault",
    importVaultButton: "Import an existing vault",
  },
  passwordGeneratorSheet: {
    copyButton: "Copy",
    usePasswordButton: "Use password",
    lengthLabel: "Length",
    hasUpperCaseLabel: "Upper case",
    hasLowerCaseLabel: "Lower case",
    hasDigitsLabel: "Digits",
    hasSymbolsLabel: "Symbols",
  },
  createVaultScreen: {
    title: "Setup a password",
    passwordCautionFirstLine: "Enter the password below",
    passwordCautionSecondLine:
      "If you forget it you’ll lose access to your vault",
    passwordEmptyError: "Password can't be empty",
  },
  passwordInput: {
    placeholder: "Password",
  },
  myPasswordsScreen: {
    headerTitle: "My passwords",
    emptyStateFirstLine: "You don't have any passwords yet",
    emptyStateSecondLine: 'Press the "+" button to create a new one',
    searchPlaceholder: "Search",
  },
  unlockVaultScreen: {
    title: "Unlock your vault",
    enterPasswordBelow: "Enter your password below",
    passwordEmptyError: "Password can't be empty",
    incorrectPasswordError: "Incorrect password",
  },
  errors: {
    createUnexpectedErrorText: (err: unknown) => {
      return `An unexpected error occurred: ${err}`;
    },
    unavailableSharingError: "Sharing is not available on this device",
  },
  deleteVaultSheet: {
    title: "Are you sure?",
    cautionFirstLine: "You won't be able to undo this action.",
    cautionSecondLine: "Make sure you have a backup",
    cancelButton: "Cancel",
    deleteButton: "Delete",
  },
  addPasswordScreen: {
    headerTitle: "Add password",
  },
  passwordForm: {
    nameInput: {
      label: "Name",
      placeholder: "Name",
    },
    passwordInput: {
      label: "Password",
    },
    usernameInput: {
      label: "Username",
      placeholder: "Username",
    },
    emailInput: {
      label: "Email",
      placeholder: "Email",
    },
    websiteInput: {
      label: "Website",
      placeholder: "Website",
    },
    notesInput: {
      label: "Notes",
      placeholder: "Additional notes",
    },
    saveButton: "Save",
  },
  passwordOverviewScreen: {
    headerTitle: "Password overview",
  },
  deletePasswordSheet: {
    title: "Are you sure?",
    cautionFirstLine: "You won't be able to undo this action.",
    cautionSecondLine: "Make sure you have a backup",
    cancelButton: "Cancel",
    deleteButton: "Delete",
  },
  settingsScreen: {
    headerTitle: "Settings",
    deleteVaultButton: "Delete vault",
  },
  settings: {
    appearanceSection: {
      label: "Appearance",
      darkModeCardText: "Dark mode",
      useSystemSettingsCardText: "Use system settings",
      passwordNameTruncateStyleCardText: "Password name truncation style",
    },
    backupSection: {
      label: "Backup",
      exportBackupCardText: "Export your vault",
      importBackupCardText: "Import an existing vault",
      changePasswordCardText: "Change password",
    },
    languageSection: {
      label: "Language",
    },
    remoteClipboardSection: {
      label: "Remote clipboard",
      remoteClipboardSettingsCardText: "Remote clipboard settings",
    },
    versionSection: {
      label: "Version",
      githubCardText: "Our product is open source",
      githubLink: "https://github.com/astsu-dev/vaulty-mobile",
    },
    creditsSection: {
      label: "Credits",
      iconPackCardText: "Xnix Circular Interface Icons",
      iconPackLink:
        "https://www.svgrepo.com/collection/xnix-circular-interface-icons",
    },
  },
  importBackupSheet: {
    title: "Enter a password",
    cautionFirstLine: "This will overwrite your current vault",
    cautionSecondLine: "Make sure you have a backup",
    cancelButton: "Cancel",
    importButton: "Import",
    passwordEmptyError: "Password can't be empty",
    incorrectPasswordOrCorruptedBackupError:
      "Incorrect password or corrupted backup file",
    successfullyImported: "Successfully imported",
  },
  importBackupScreen: {
    title: "Import vault",
    cautionFirstLine: "Enter the password for the imported vault",
    cautionSecondLine: "This will overwrite your current vault",
    passwordEmptyError: "Password can't be empty",
    incorrectPasswordOrCorruptedBackupError:
      "Incorrect password or corrupted vault file",
    successfullyImported: "Successfully imported",
  },
  changeVaultPasswordScreen: {
    title: "Change password",
    descriptionFirstLine: "Enter your new password below",
    descriptionSecondLine: "This will reencrypt your vault with a new password",
    passwordEmptyError: "Password can't be empty",
    successfullyChanged: "Password successfully changed",
  },
  clearPasswordFromClipboardNotification: {
    title: "Password copied",
    description: (timeout) =>
      `Your clipboard will be cleared in ${timeout} seconds`,
  },
  changeLanguageSheet: {
    title: "Change language",
  },
  remoteClipboardSettingsScreen: {
    headerTitle: "Remote clipboard settings",
    enableRemoteClipboardCardText: "Enable remote clipboard",
    portInputLabel: "Server Port",
    portInputPlaceholder: "8090",
    passwordInputLabel: "Password",
    passwordInputPlaceholder: "Password",
    description:
      "Remote clipboard helps you copy your passwords to another device. It’s important to use a strong password as it’s used to encrypt data while  transferring between devices. To see how to setup the remote clipboard on another device press the “How to setup?” button below.",
    setupGuideLink: "https://github.com/astsu-dev/vaulty-remote-clipboard",
    howToSetupButtonText: "How to setup?",
  },
  changePasswordNameTruncateStyleSheet: {
    title: "Password name truncation style",
    fromLeftValue: "From left (…ssword)",
    fromRightValue: "From right (passwo…)",
  },
  copyToast: {
    copied: "Copied",
  },
};
