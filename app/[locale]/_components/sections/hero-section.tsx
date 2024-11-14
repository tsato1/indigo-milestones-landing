import Image from "next/image"
import { getTranslations } from "next-intl/server";
import { NextFont } from "next/dist/compiled/@next/font";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
  headingFont: NextFont
}

export const HeroSection = async ({
  headingFont
}: HeroSectionProps) => {
  const t = await getTranslations("home.hero")

  return (
    <>
      <div className="text-center p-10 pt-32 space-y-1 md:space-y-2">
        <p className={cn("text-3xl md:text-6xl text-indigo-700", headingFont.className)}>Indigo Milestones</p>
        <p className="text-md md:text-xl text-indigo-800">{t("catchCopy")}</p>
      </div>

      <div className="w-full pt-20 pb-20">
        <div className="w-full md:max-w-screen-2xl h-[400px] flex lg:flex-row-reverse flex-col items-center justify-center mx-auto">
          <div className="space-y-3 text-xl md:text-3xl bg-gradient-to-r via-10%">
            <div dangerouslySetInnerHTML={{__html: t.raw('setMilestones')}} />
            <div dangerouslySetInnerHTML={{__html: t.raw('hitTargets')}} />
            <div dangerouslySetInnerHTML={{__html: t.raw('achieveGoals')}} />
          </div>
          <div className="relative sm:w-[600px] w-full h-full">
            <Image
              className="object-contain"
              src="/landing/hero.png"
              fill
              sizes="50vw"
              alt="Hero Image"
              priority={true} />
          </div>
        </div>
      </div>
    </>
  )
}