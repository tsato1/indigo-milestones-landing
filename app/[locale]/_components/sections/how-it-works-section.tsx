import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Section } from "../section"

export const HowItWorksSection = async () => {
  const t = await getTranslations("home.howItWorks")

  return (
    <Section isWhiteBackground={false}>
      <div className="md:max-w-screen-2xl flex flex-col items-center mx-auto">
        <h1 className="text-center text-2xl sm:text-4xl font-bold pb-10">{t("howItWorks")}</h1>
        <div className="w-full lg:w-[900px] space-y-10 grid grid-cols-1 sm:grid-cols-2">
          <p className="flex items-center justify-center text-base sm:text-xl order-1"><span className="m-2">1.</span>{t("createPath")}</p>
          <div className="relative h-[200px] sm:h-[200px] lg:h-[250px] order-2">
            <Image
              className="object-contain align-baseline"
              src="/landing/how_1.svg"
              fill
              sizes="33vw"
              alt="How it works 1" />
          </div>

          <p className="flex items-center justify-center text-base sm:text-xl order-3 sm:order-4"><span className="m-2">2.</span>{t("createMilestone")}</p>
          <div className="relative h-[200px] sm:h-[200px] lg:h-[250px] order-4 sm:order-3">
            <Image
              className="object-contain align-baseline"
              src="/landing/how_2.svg"
              fill
              sizes="33vw"
              alt="How it works 2" />
          </div>

          <p className="flex items-center justify-center text-base sm:text-xl order-5"><span className="m-2">3.</span>{t("createTarget")}</p>
          <div className="relative h-[200px] sm:h-[200px] lg:h-[250px] order-6">
            <Image
              className="object-contain align-baseline"
              src="/landing/how_3.svg"
              fill
              sizes="33vw"
              alt="How it works 3" />
          </div>

          <p className="flex items-center justify-center text-base sm:text-xl order-7 sm:order-8"><span className="m-2">4.</span>{t("createTask")}</p>
          <div className="relative h-[200px] sm:h-[200px] lg:h-[250px] order-8 sm:order-7">
            <Image
              className="object-contain align-baseline"
              src="/landing/how_4.svg"
              fill
              sizes="33vw"
              alt="Image_1" />
          </div>

          <p className="flex items-center justify-center text-base sm:text-xl order-9"><span className="m-2">5.</span>{t("reviewMilestone")}</p>
          <div className="relative h-[200px] sm:h-[200px] lg:h-[250px] order-10">
            <Image
              className="object-contain align-baseline"
              src="/landing/how_5.svg"
              fill
              sizes="33vw"
              alt="Image_1" />
          </div>
        </div>
      </div>
    </Section>
  )
}