"use client"

import { useState, useEffect } from "react"

import { AlertDialog } from "@/components/dialogs/alert-dialog"
import { LoginForCheckoutDialog } from "@/components/dialogs/login-for-checkout-dialog"
import { ContactSupportForPricingDialog } from "@/components/dialogs/contact-support-for-pricing-dialog"

export const MyDialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  /* 
  Server side rendering should not open a modal, hence "use client"
  This Provider will make sure that the client render is triggered by using the below useEffect()
  This will avoid hydration error (desynchronization of server side and client side rendering)
   */
  useEffect(() => {
    setIsMounted(true)
  }, [])

  /* We are in the server side */
  if (!isMounted) {
    return null
  }

  /* We are in the client side */
  return (
    <>
      <AlertDialog />
      <LoginForCheckoutDialog />
      <ContactSupportForPricingDialog />
    </>
  )
} 