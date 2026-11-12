import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

/** Un texte disponible dans les deux langues du site. */
export type L = { fr: string; en: string };

export const languages: { code: Lang; label: string; name: string }[] = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
];

const storageKey = "mellinium-lang";

/** Choix mémorisé, sinon langue du navigateur si elle est prise en charge, sinon anglais. */
function detectLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // Stockage indisponible (navigation privée) : on se rabat sur le navigateur.
  }
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = tag?.slice(0, 2).toLowerCase();
    if (code === "fr" || code === "en") return code;
  }
  return "en";
}

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: L) => string;
  locale: string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Le choix reste actif pour la session même sans stockage.
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t: (text) => text[lang], locale: lang === "fr" ? "fr-TN" : "en-GB" }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <LanguageProvider>");
  return context;
}
