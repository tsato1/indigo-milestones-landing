"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "link" | "ghost"
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default"
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <div className={cn("relative text-right", className)}>
      <Button
        disabled={pending || disabled}
        type="submit"
        variant={variant}
        size="sm"
      >
        {children}
      </Button>
    </div>
  )
}