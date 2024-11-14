import { create } from "zustand"

export type MyDialogType = "Alert" | "LoginForCheckout" | "ContactSupportForPricing"

interface MyDialogData {
  // Alert Dialog
  title?: string
  message?: string

  // LoginForCheckout Dilaog
  paymentInterval?: "year" | "month"
  numTeamMembers?: number
}

interface useMyDialogStore {
  myDialogType: MyDialogType | null,
  myDialogData: MyDialogData,
  isOpen: boolean,
  onOpen: (type: MyDialogType, data?: MyDialogData) => void
  onClose: () => void
}

export const useMyDialog = create<useMyDialogStore>((set) => ({
  myDialogType: null,
  myDialogData: {},
  isOpen: false,
  onOpen: (myDialogType, myDialogData = {}) => set({ isOpen: true, myDialogType: myDialogType, myDialogData: myDialogData }),
  onClose: () => set({ isOpen: false, myDialogType: null })
}))