"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { GlobeIcon } from "lucide-react"

import useLanguage from "@/hooks/use-language"
import { Language } from "@/constants"
import { cn, languageToCountryCode, languageToLanguageString } from "@/lib/utils"
import { LoginButton } from "@/components/auth/login-button"
import { MyLogo } from "@/components/my-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const TopNavbar = () => {
  const t = useTranslations("navbar")

  const router = useRouter()

  const { language, setLanguage } = useLanguage()

  const onValueChange = (value: string) => {
    setLanguage(Language[value as keyof typeof Language])

    router.push(`/${value.toLowerCase()}`)
  }

  return (
    <nav className="fixed top-0 z-10 w-full flex items-center h-16 px-4 border-bottom shadow-sm bg-white">
      <div className="w-full md:max-w-screen-2xl top-0 flex items-center justify-between mx-auto">
        <MyLogo href="/" />
        <div className="flex items-center gap-x-2">
          <LoginButton label={t("logInAndGoToDashboard")} />

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
              <div className="h-9 w-9 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-0">
                <Image
                  src={`https://flagsapi.com/${languageToCountryCode(language)}/flat/64.png`}
                  alt="Flag"
                  width={20}
                  height={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuLabel className="flex items-center">
                <GlobeIcon className="w-4 h-4 mr-2" />
                {t("language")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={language.toUpperCase()} onValueChange={onValueChange}>
                {Object.keys(Language).map((item) => (
                  <DropdownMenuRadioItem
                    key={item}
                    value={item}
                    className={cn("cursor-pointer pl-2", item === language.toUpperCase() && "border-2 border-indigo-300")}
                  >
                    <div className="w-fit flex items-center gap-x-2">
                      <Image
                        src={`https://flagsapi.com/${languageToCountryCode(Language[item as keyof typeof Language])}/flat/64.png`}
                        alt="Flag"
                        width={20}
                        height={20} />

                      <p className="font-medium text-zinc-700">
                        {languageToLanguageString(Language[item as keyof typeof Language])}
                      </p>
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav >
  )
}
