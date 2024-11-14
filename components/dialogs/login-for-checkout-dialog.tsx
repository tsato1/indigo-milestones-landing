"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { FcGoogle } from "react-icons/fc"
import { useQuery } from "@tanstack/react-query"

import { useMyDialog } from "@/hooks/use-my-dialog"
import { useToast } from "@/hooks/use-toast"
import { fetcher } from "@/lib/fetcher"
import { MyDialog } from "@/components/my-dialog"
import { MyLoading } from "@/components/my-loading"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ConstantParams } from "@/types"

export const LoginForCheckoutDialog = () => {
  const t = useTranslations("components.dialogs.loginForCheckout")
  const c = useTranslations("common")

  const [isPending, setIsPending] = useState(false)

  const [isChecked, setIsChecked] = useState(false)

  const { toast } = useToast()

  const { myDialogType, myDialogData, onClose } = useMyDialog()
  const isDialogOpen = myDialogType === "LoginForCheckout"

  const { data: constantParams, isFetching } = useQuery<ConstantParams>({
    queryKey: ["constant-params"],
    queryFn: () => fetcher(`/api/constant-params`),
  })

  const onClick = () => {
    if (isChecked) {
      setIsPending(true)
      //todo: call backend
    }
    else {
      toast({
        variant: "destructive",
        title: c("error"),
        description: "You cannot proceed unless you check the checkbox."
      })
    }
  }

  if (!constantParams) {
    return <div className="text-center">{c("noData")}</div>
  }

  return (
    <MyDialog
      title={t("login")}
      isOpen={isDialogOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative border border-zinc-200 bg-zinc-100 rounded-md p-5">
          <p className="absolute -top-3 px-2 text-xs sm:text-sm border border-zinc-300 bg-white rounded-full">{t("purchaseInfo")}</p>
          <p className="text-xs">{t("numTeamMembers")}<span className="font-semibold text-zinc-800">{myDialogData.numTeamMembers}</span></p>
          <p className="text-xs">{t("paymentEvery")}<span className="font-semibold text-zinc-800 uppercase">{myDialogData.paymentInterval}</span></p>
          {myDialogData.paymentInterval === "year" && <p>{t("total")}<span>${myDialogData.numTeamMembers! * constantParams.priceYearlyPerMemberPerMonth * 12}{t("perYear")}</span></p>}
          {myDialogData.paymentInterval === "month" && <p>{t("total")}<span>${myDialogData.numTeamMembers! * constantParams.priceMonthlyPerMemberPerMonth}{t("perMonth")}</span></p>}
        </div>

        <div className="text-muted-foreground">{t("firstLogin")}</div>

        <div className="flex items-center gap-x-2">
          <Checkbox id="terms" onCheckedChange={(data) => setIsChecked(data ? true : false)} checked={isChecked} />
          <label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("iHaveRead")}<Link href="/terms-and-conditions" target="_blank" className="underline font-semibold">{t("termsAndConditions")}</Link> & <Link href="/privacy-policy" target="_blank" className="underline font-semibold">{t("privacyPolicy")}</Link>.
          </label>
        </div>

        <Button
          className="relative w-fit text-md"
          onClick={() => onClick()}
          size="lg"
          variant="outline"
          disabled={isFetching || isPending}
        >
          <FcGoogle className="h-6 w-6 mr-2" />
          {t("login")}
          {isPending && <MyLoading className="absolute" size={40} />}
        </Button>
      </div>
    </MyDialog>
  )
}
