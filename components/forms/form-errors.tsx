"use client"

interface FormErrorsProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormErrors = ({
  id,
  errors
}: FormErrorsProps) => {
  if (!errors || !errors[id]) {
    return null
  }

  return (
    <div
      className="text-destructive"
      id={`${id}-error`}
      aria-live="polite"
    >
      {errors[id]?.map((error: string) => (
        <div
          key={error}
          className="text-xs text-nowrap font-medium text-destructive"
        >
          {error}
        </div>
      ))}
    </div>
  )
}