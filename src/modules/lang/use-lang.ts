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
};

export function useLang(): LangDictionary {
  return {
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
      },
      backupSection: {
        label: "Backup",
        exportBackupCardText: "Export your vault",
        importBackupCardText: "Import an existing vault",
        changePasswordCardText: "Change password",
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
      descriptionSecondLine:
        "This will reencrypt your vault with a new password",
      passwordEmptyError: "Password can't be empty",
      successfullyChanged: "Password successfully changed",
    },
  };
}
