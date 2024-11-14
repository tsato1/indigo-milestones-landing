"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { MyLoading } from "@/components/my-loading"
import { Button } from "@/components/ui/button"

interface LoginButtonProps {
  label: string
}

export const LoginButton = ({
  label
}: LoginButtonProps) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(() => {
      // todo: call backend to login
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
    >
      {isPending && (
        <MyLoading className="absolute" size={25} color="white" />
      )}
      <span className={cn("block", isPending && "invisible")}>{label}</span>
    </Button>
  )
}
