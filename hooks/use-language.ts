import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { Language } from "@/constants"

type LanguageStore = {
  language: Language
  setLanguage: (language: Language) => void
}

const useLanguage = create(persist<LanguageStore>((set) => ({
  language: Language.EN,
  setLanguage: (language: Language) => {
    set({ language })
  }
}), {
  name: "language-storage",
  storage: createJSONStorage(() => localStorage)
}))

export default useLanguage