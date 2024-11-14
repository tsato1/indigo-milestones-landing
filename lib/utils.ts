import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Language } from "@/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function languageToCountryCode(language: Language) {
  switch (language) {
    case Language.EN:
      return "GB"
    case Language.JA:
      return "JP"
    default:
      return "GB"
  }
}

export function languageToLanguageString(language: Language) {
  switch (language) {
    case Language.EN:
      return "English"
    case Language.JA:
      return "日本語"
    default:
      return "English"
  }
}