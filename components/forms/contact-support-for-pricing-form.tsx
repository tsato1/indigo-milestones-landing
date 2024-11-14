"use client"

import { ElementRef, useRef, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useMutation, useQuery } from "@tanstack/react-query"

import { useToast } from "@/hooks/use-toast"
import { fetcher, mutator } from "@/lib/fetcher"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ConstantParams } from "@/types"
import { Label } from "@/components/ui/label"
import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"

interface ContactSupportForPricingProps {
  numTeamMembers?: number,
  onClose: () => void
}

export const ContactSupportForPricingForm = ({
  numTeamMembers,
  onClose,
}: ContactSupportForPricingProps) => {
  const t = useTranslations("components.forms.contactSupportForPricing")
  const c = useTranslations("common")

  const { toast } = useToast()

  const formRef = useRef<ElementRef<"form">>(null)
  const legalNameRef = useRef<ElementRef<"input">>(null)
  const emailRef = useRef<ElementRef<"input">>(null)
  const confirmEmailRef = useRef<ElementRef<"input">>(null)
  const companyNameRef = useRef<ElementRef<"input">>(null)
  const numMembersRef = useRef<ElementRef<"input">>(null)

  const [isPending, startTransition] = useTransition()

  const { data: constantParams, isFetching } = useQuery<ConstantParams>({
    queryKey: ["constant-params"],
    queryFn: () => fetcher(`/api/constant-params`),
  })

  const mutation = useMutation<string>({
    mutationFn: () => mutator(`/api/contact-support-for-pricing`, "PATCH"),
    onSuccess: (data) => {
      onClose()

      toast({
        variant: "success",
        title: c("success"),
        description: t("thankYouForInquiry")
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: c("Error"),
        description: t("failedToSendInquiry")
      })
    }
  })

  const onSubmit = (formData: FormData) => {
    startTransition(() => {
      mutation.mutate()
    })
  }

  if (!constantParams) {
    return <div className="text-center">{c("noData")}</div>
  }

  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="space-y-2 sm:space-y-4"
    >
      <div className="space-y-1">
        <Label
          htmlFor="legalName"
          className="text-sm font-semibold text-zinc-500 dark:text-secondary/70"
        >
          {t("legalName")} <span className="text-red-500">*</span>
        </Label>
        <FormInput
          id="legalName"
          ref={legalNameRef}
          min={1}
          max={100}
          className="w-full mt-2"
          placeholder=""
          disabled={isFetching || isPending} />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="email"
          className="text-sm font-semibold text-zinc-500 dark:text-secondary/70"
        >
          {t("email")} <span className="text-red-500">*</span>
        </Label>
        <FormInput
          id="email"
          ref={emailRef}
          type="email"
          className="w-full mt-2"
          placeholder=""
          disabled={isFetching || isPending} />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="confirmEmail"
          className="text-sm font-semibold text-zinc-500 dark:text-secondary/70"
        >
          {t("confirmEmail")} <span className="text-red-500">*</span>
        </Label>
        <FormInput
          id="confirmEmail"
          ref={confirmEmailRef}
          type="email"
          className="w-full mt-2"
          placeholder=""
          disabled={isFetching || isPending} />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="companyName"
          className="text-sm font-semibold text-zinc-500 dark:text-secondary/70"
        >
          {t("companyName")} <span className="text-red-500">*</span>
        </Label>
        <FormInput
          id="companyName"
          ref={companyNameRef}
          min={1}
          max={100}
          className="w-full mt-2"
          placeholder=""
          disabled={isFetching || isPending} />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="numMembers"
          className="text-sm font-semibold text-zinc-500 dark:text-secondary/70"
        >
          {t("numMembers")} <span className="text-red-500">*</span>
        </Label>
        <FormInput
          id="numMembers"
          ref={numMembersRef}
          type="number"
          min={constantParams.minNumMembersCustomPlan}
          max={constantParams.maxNumMembersCustomPlan}
          className="w-full mt-2"
          defaultValue={numTeamMembers ? String(numTeamMembers) : "2"}
          placeholder=""
          disabled={isFetching || isPending} />
      </div>

      <div className="flex items-center justify-end gap-x-2">
        <Button
          type="button"
          size="sm"
          onClick={onClose}
          variant="ghost"
          disabled={isFetching || isPending}
        >
          {c("cancel")}
        </Button>
        <FormSubmit>
          {c("save")}
        </FormSubmit>
      </div>
    </form>
  )
}

ContactSupportForPricingForm.Skeleton = function ContactSupportForPricingFormSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[75px] w-[250px] sm:w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-[190px] sm:w-[250px]" />
        <Skeleton className="h-7 w-[190px] sm:w-[200px]" />
      </div>
    </div>
  )
}
