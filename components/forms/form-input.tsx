"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FormErrors } from "./form-errors"

interface FormInputProps {
  id: string
  label?: string
  description?: string
  type?: string,
  min?: number,
  max?: number,
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  autoFocus?: boolean
  defaultValue?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  description,
  type,
  min,
  max,
  placeholder,
  required,
  disabled,
  errors,
  className,
  autoFocus = false,
  defaultValue = "",
  onBlur
}, ref) => {
  const { pending } = useFormStatus()

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label ? (
          <Label
            htmlFor={id}
            className="text-sm font-semibold text-zinc-500 dark:text-secondary/70"
          >
            <p>{label} {required && <span className="text-red-500">*</span>}</p>
          </Label>
        ) : null}
        {description ? (
          <Label
            htmlFor={id}
            className="text-xs text-muted-foreground"
          >
            <p>{description}</p>
          </Label>
        ) : null}
        <Input
          className={cn(
            "text-sm bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black text-ellipsis",
            className
          )}
          id={id}
          name={id}
          ref={ref}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
          disabled={pending || disabled}
          onBlur={onBlur}
          autoFocus={autoFocus}
          aria-describedby={`${id}-error`} />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
})

FormInput.displayName = "FormInput"