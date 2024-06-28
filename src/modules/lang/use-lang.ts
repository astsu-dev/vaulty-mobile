import { enDictionary } from "./dictionaries/en-dictionary";
import { ukDictionary } from "./dictionaries/uk-dictionary";
import { LangDictionary } from "./lang-dictionary";
import { Language } from "./language";
import { useLangStore } from "./store/lang-store";

const languageToDictionary: Record<Language, LangDictionary> = {
  [Language.EN]: enDictionary,
  [Language.UK]: ukDictionary,
};

export function useLang(): LangDictionary {
  const { language } = useLangStore();
  return languageToDictionary[language];
}
