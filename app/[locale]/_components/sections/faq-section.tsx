"use client"

import { useTranslations } from "next-intl"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section } from "../section"

export const FaqSection = () => {
  const t = useTranslations("home.faq")

  return (
    <Section isWhiteBackground={true}>
      <div className="md:max-w-screen-2xl mx-auto">
        <h1 className="text-center text-2xl sm:text-4xl font-bold pb-10">FAQ</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("thereAreManyAppsLikeThis")}</AccordionTrigger>
            <AccordionContent>{t("thereMayBeSimilarApps")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{t("ifIPurchaseTheOnetime")}</AccordionTrigger>
            <AccordionContent>{t("unfortunatelyWeDoNot")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>{t("iAmOnSubscription")}</AccordionTrigger>
            <AccordionContent>{t("yesYouCanStop")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>{t("iAmSearchingFor")}</AccordionTrigger>
            <AccordionContent>{t("notNecessarily")}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  )
}