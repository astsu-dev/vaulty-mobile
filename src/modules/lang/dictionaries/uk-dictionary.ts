import { LangDictionary } from "../lang-dictionary";

export const ukDictionary: LangDictionary = {
  welcomeScreen: {
    greetings: "Вітаємо у Vaulty!",
    letsSetupYourVault: "Давайте налаштуємо ваше сховище.",
    createVaultButton: "Створити нове сховище",
    importVaultButton: "Імпортувати існуюче сховище",
  },
  passwordGeneratorSheet: {
    copyButton: "Скопіювати",
    usePasswordButton: "Використати",
    lengthLabel: "Довжина",
    hasUpperCaseLabel: "Великі літери",
    hasLowerCaseLabel: "Малі літери",
    hasDigitsLabel: "Цифри",
    hasSymbolsLabel: "Символи",
  },
  createVaultScreen: {
    title: "Встановіть пароль",
    passwordCautionFirstLine: "Введіть пароль для вашого сховища нижче.",
    passwordCautionSecondLine:
      "Якщо ви забудете пароль, ви не зможете відновити ваші дані.",
    passwordEmptyError: "Пароль не може бути порожнім",
  },
  passwordInput: {
    placeholder: "Пароль",
  },
  myPasswordsScreen: {
    headerTitle: "Мої паролі",
    emptyStateFirstLine: "У вас ще немає паролів.",
    emptyStateSecondLine: 'Натисніть на "+" щоб додати новий',
    searchPlaceholder: "Пошук",
  },
  unlockVaultScreen: {
    title: "Розблокуйте ваше сховище",
    enterPasswordBelow: "Введіть ваш пароль нижче.",
    passwordEmptyError: "Пароль не може бути порожнім",
    incorrectPasswordError: "Неправильний пароль",
  },
  errors: {
    createUnexpectedErrorText: (err: unknown) => {
      return `Виникла неочікувана помилка: ${err}`;
    },
    unavailableSharingError: "Поширення недоступне на вашому пристрої",
  },
  deleteVaultSheet: {
    title: "Ви впевнені?",
    cautionFirstLine: "Ви не зможете відмінити цю дію.",
    cautionSecondLine: "Переконайтеся, що у вас є резервна копія",
    cancelButton: "Відмінити",
    deleteButton: "Видалити",
  },
  addPasswordScreen: {
    headerTitle: "Створення пароля",
  },
  passwordForm: {
    nameInput: {
      label: "Назва",
      placeholder: "Назва",
    },
    passwordInput: {
      label: "Пароль",
    },
    usernameInput: {
      label: "Імʼя користувача",
      placeholder: "Імʼя користувача",
    },
    emailInput: {
      label: "Email",
      placeholder: "Email",
    },
    websiteInput: {
      label: "Сайт",
      placeholder: "Сайт",
    },
    notesInput: {
      label: "Додатково",
      placeholder: "Додаткові дані",
    },
    saveButton: "Зберегти",
  },
  passwordOverviewScreen: {
    headerTitle: "Деталі пароля",
  },
  deletePasswordSheet: {
    title: "Ви впевнені?",
    cautionFirstLine: "Ви не зможете відмінити цю дію.",
    cautionSecondLine: "Переконайтеся, що у вас є резервна копія",
    cancelButton: "Відмінити",
    deleteButton: "Видалити",
  },
  settingsScreen: {
    headerTitle: "Налаштування",
    deleteVaultButton: "Видалити сховище",
  },
  settings: {
    appearanceSection: {
      label: "Вигляд",
      darkModeCardText: "Темна тема",
      useSystemSettingsCardText: "Системні налаштування",
    },
    backupSection: {
      label: "Резервне копіювання",
      exportBackupCardText: "Експортувати ваше сховище",
      importBackupCardText: "Імпортувати існуюче сховище",
      changePasswordCardText: "Змінити пароль",
    },
    languageSection: {
      label: "Мова",
    },
    remoteClipboardSection: {
      label: "Віддалений буфер обміну",
      remoteClipboardSettingsCardText: "Налаштування сервера",
    },
  },
  importBackupSheet: {
    title: "Імпортувати сховище",
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
    title: "Імпорт сховища",
    cautionFirstLine: "Введіть пароль до сховища нижче.",
    cautionSecondLine: "Це перезапише ваше поточне сховище.",
    passwordEmptyError: "Пароль не може бути порожнім",
    incorrectPasswordOrCorruptedBackupError:
      "Неправильний пароль або пошкоджений файл резервної копії",
    successfullyImported: "Успішно імпортовано",
  },
  changeVaultPasswordScreen: {
    title: "Змінити пароль",
    descriptionFirstLine: "Введіть ваш новий пароль нижче.",
    descriptionSecondLine: "Це зашифрує ваше сховище з новим паролем",
    passwordEmptyError: "Пароль не може бути порожнім",
    successfullyChanged: "Пароль успішно змінено",
  },
  clearPasswordFromClipboardNotification: {
    title: "Пароль скопійовано",
    description: (timeout) => {
      const lastDigit = timeout % 10;

      let secondsText: string;
      switch (lastDigit) {
        case 1:
          secondsText = "секунду";
          break;
        case 2:
        case 3:
        case 4:
          secondsText = "секунди";
          break;
        default:
          secondsText = "секунд";
          break;
      }
      return `Ваш буфер обміну буде очищено через ${timeout} ${secondsText}`;
    },
  },
  changeLanguageSheet: {
    title: "Змінити мову",
  },
  remoteClipboardSettingsScreen: {
    headerTitle: "Віддалений буфер обміну",
    enableRemoteClipboardCardText: "Віддалений буфер обміну",
    portInputLabel: "Порт сервера",
    portInputPlaceholder: "8090",
    apiKeyInputLabel: "API ключ",
    apiKeyInputPlaceholder: "API ключ",
    descriptionFirstLine: "Віддалений буфер обміну дозволяє вам",
    descriptionSecondLine: "копіювати паролі на інший пристрій",
  },
  copyToRemote: {
    successfullyCopied: "Скопійовано",
  },
};
