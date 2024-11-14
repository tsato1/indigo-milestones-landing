"use client"

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { FormSubmitSuccess } from "@/components/forms/form-submit-success"
import { FormSubmitError } from "@/components/forms/form-submit-error"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { MyLoading } from "@/components/my-loading"

interface LoginFormProps {
}

export const LoginForm = ({
}: LoginFormProps) => {
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")

  let urlError = ""
  switch (searchParams.get("error")) {
    case "OAuthAccountNotLinked":
      urlError = "Email already in use with a different provider. Please try again with the original provider you used to register."
      setError(urlError)
      break
    case "InvalidCheck":
      urlError = "Your browser might be blocking cookies. Please enable it."
      setError(urlError)
      break
  }

  const onClick = () => {
    startTransition(() => {
      // todo: call backend for login
    })
  }

  return (
    <Card className="shadow-md space-y-6 text-center pt-5 pb-5">
      <CardHeader className="text-3xl text-bold">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          We only support Google login now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-[100px]"
          onClick={() => onClick()}
          size="lg"
          variant="outline"
          disabled={isPending}
        >
          <FcGoogle />
          {isPending && <MyLoading size={30} />}
        </Button>

        <FormSubmitSuccess message={success} />
        <FormSubmitError message={error || urlError} />
      </CardContent>
    </Card>
  )
}