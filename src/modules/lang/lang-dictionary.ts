export type LangDictionary = {
  welcomeScreen: {
    greetings: string;
    letsSetupYourVault: string;
    createVaultButton: string;
    importVaultButton: string;
  };
  passwordGeneratorSheet: {
    copyButton: string;
    usePasswordButton: string;
    lengthLabel: string;
    hasUpperCaseLabel: string;
    hasLowerCaseLabel: string;
    hasDigitsLabel: string;
    hasSymbolsLabel: string;
  };
  createVaultScreen: {
    title: string;
    passwordCautionFirstLine: string;
    passwordCautionSecondLine: string;
    passwordEmptyError: string;
  };
  passwordInput: {
    placeholder: string;
  };
  myPasswordsScreen: {
    headerTitle: string;
    emptyStateFirstLine: string;
    emptyStateSecondLine: string;
    searchPlaceholder: string;
  };
  unlockVaultScreen: {
    title: string;
    enterPasswordBelow: string;
    passwordEmptyError: string;
    incorrectPasswordError: string;
  };
  errors: {
    createUnexpectedErrorText: (err: unknown) => string;
    unavailableSharingError: string;
  };
  deleteVaultSheet: {
    title: string;
    cautionFirstLine: string;
    cautionSecondLine: string;
    cancelButton: string;
    deleteButton: string;
  };
  addPasswordScreen: {
    headerTitle: string;
  };
  passwordForm: {
    nameInput: {
      label: string;
      placeholder: string;
    };
    passwordInput: {
      label: string;
    };
    usernameInput: {
      label: string;
      placeholder: string;
    };
    emailInput: {
      label: string;
      placeholder: string;
    };
    websiteInput: {
      label: string;
      placeholder: string;
    };
    notesInput: {
      label: string;
      placeholder: string;
    };
    saveButton: string;
  };
  passwordOverviewScreen: {
    headerTitle: string;
  };
  deletePasswordSheet: {
    title: string;
    cautionFirstLine: string;
    cautionSecondLine: string;
    cancelButton: string;
    deleteButton: string;
  };
  settingsScreen: {
    headerTitle: string;
    deleteVaultButton: string;
  };
  settings: {
    appearanceSection: {
      label: string;
      darkModeCardText: string;
      useSystemSettingsCardText: string;
    };
    backupSection: {
      label: string;
      exportBackupCardText: string;
      importBackupCardText: string;
      changePasswordCardText: string;
    };
    languageSection: {
      label: string;
    };
  };
  importBackupSheet: {
    title: string;
    cautionFirstLine: string;
    cautionSecondLine: string;
    cancelButton: string;
    importButton: string;
    passwordEmptyError: string;
    incorrectPasswordOrCorruptedBackupError: string;
    successfullyImported: string;
  };
  importBackupScreen: {
    title: string;
    cautionFirstLine: string;
    cautionSecondLine: string;
    passwordEmptyError: string;
    incorrectPasswordOrCorruptedBackupError: string;
    successfullyImported: string;
  };
  changeVaultPasswordScreen: {
    title: string;
    descriptionFirstLine: string;
    descriptionSecondLine: string;
    passwordEmptyError: string;
    successfullyChanged: string;
  };
  clearPasswordFromClipboardNotification: {
    title: string;
    description: (timeout: number) => string;
  };
  changeLanguageSheet: {
    title: string;
  };
};
