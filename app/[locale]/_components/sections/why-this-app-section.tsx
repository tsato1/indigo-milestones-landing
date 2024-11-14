import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { NextFont } from "next/dist/compiled/@next/font"

import { cn } from "@/lib/utils"
import { Section } from "../section"

interface WhyThisAppSectionProps {
  headingFont: NextFont
}

export const WhyThisAppSection = async ({
  headingFont
}: WhyThisAppSectionProps) => {
  const t = await getTranslations("home.whyThisApp")

  return (
    <Section isWhiteBackground={true}>
      <div className="md:max-w-screen-2xl mx-auto space-y-4">
        <h1 className="text-center text-2xl sm:text-4xl font-bold pb-10">{t("whyThisApp")}</h1>
        <p className="text-center text-base sm:text-lg pb-5">{t("weAllHaveMadeMistakes")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 text-sm sm:text-base pb-5">
          <div>
            <div className="relative h-[200px] sm:h-[200px] lg:h-[250px]">
              <Image
                className="object-contain align-baseline"
                src="/landing/why_1.svg"
                fill
                sizes="33vw"
                alt="Image_1" />
            </div>
            <p className="text-center">{t("givingAttention")}</p>
          </div>
          <div>
            <div className="relative h-[200px] sm:h-[200px] lg:h-[250px]">
              <Image
                className="object-contain"
                src="/landing/why_2.svg"
                fill
                sizes="33vw"
                alt="Image_2" />
            </div>
            <p className="text-center">{t("beingLured")}</p>
          </div>
          <div>
            <div className="relative h-[200px] sm:h-[200px] lg:h-[250px]">
              <Image
                className="object-contain"
                src="/landing/why_3.svg"
                fill
                sizes="33vw"
                alt="Image_3" />
            </div>
            <p className="text-center">{t("forgetting")}</p>
          </div>
        </div>
        <div className="text-center text-base sm:text-lg">
          <div className="leading-10">With <span className={cn("text-indigo-700", headingFont.className)}>Indigo Milestones</span>,
            <div dangerouslySetInnerHTML={{__html: t.raw("youStayOnTrack")}} />
            <div dangerouslySetInnerHTML={{__html: t.raw("notDigressingFrom")}} />
            <div dangerouslySetInnerHTML={{__html: t.raw("whatYouReallyWanted")}} />
          </div>
        </div>
      </div>
    </Section>
  )
}