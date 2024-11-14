"use client"

import { useMyDialog } from "@/hooks/use-my-dialog"
import { MyDialog } from "@/components/my-dialog"
import { Button } from "@/components/ui/button"

export const AlertDialog = () => {

  const { myDialogType, myDialogData, isOpen, onClose } = useMyDialog()

  const isDialogOpen = isOpen && myDialogType === "Alert"

  return (
    <MyDialog
      title={`${myDialogData.title}`}
      isOpen={isDialogOpen}
      onClose={onClose}
    >
      <div className="text-center">
        {myDialogData.message}
      </div>
      <div className="w-full flex items-center justify-end">
        <Button size="sm" onClick={() => onClose()}>
          OK
        </Button>
      </div>
    </MyDialog>
  )
}