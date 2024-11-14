import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { REDIRECT_ROOT } from "@/routes"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function NotFoundPage() {
  const t = await getTranslations("notFound")

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-3xl">{t("pageNotFound")}</CardTitle>
          <CardDescription>{t("pageNotFoundDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-[200px] h-[150px]">
            <Image
              className="object-contain"
              src="/not-found.svg"
              alt="Not found"
              fill
              sizes="33vw" />
          </div>
          <Button>
            <Link href={REDIRECT_ROOT}>{t("toDashboard")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}