"use client"

import { useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

interface MyDialogProps {
  title?: string,
  description?: string,
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode,
  className?: string
}

export const MyDialog = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
}: MyDialogProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={cn("lg:max-w-screen-lg max-h-[90%] overflow-y-scroll text-black p-3", className)}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}