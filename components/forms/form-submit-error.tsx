import { AlertTriangleIcon } from "lucide-react"

interface FormSubmitErrorProps {
  message?: string;
}

export const FormSubmitError = ({
  message
}: FormSubmitErrorProps) => {
  if (!message) return null

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <AlertTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}