"use client"

import { useMyDialog } from "@/hooks/use-my-dialog"
import { MyDialog } from "@/components/my-dialog"
import { ContactSupportForPricingForm } from "@/components/forms/contact-support-for-pricing-form"
import { useTranslations } from "next-intl"

export const ContactSupportForPricingDialog = () => {
  const t = useTranslations("components.forms.contactSupportForPricing")

  const { myDialogData, myDialogType, isOpen, onClose } = useMyDialog()

  const isDialogOpen = isOpen && myDialogType === "ContactSupportForPricing"

  return (
    <MyDialog
      title={t("contactSupportForPricing")}
      isOpen={isDialogOpen}
      onClose={onClose}
      className="w-full sm:w-[600px]"
    >
      <ContactSupportForPricingForm numTeamMembers={myDialogData.numTeamMembers} onClose={onClose} />
    </MyDialog>
  )
}