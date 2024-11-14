"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import localFont from "next/font/local"

import { REDIRECT_ROOT } from "@/routes"
import { cn } from "@/lib/utils"

const headingFont = localFont({
  src: "../app/fonts/PermanentMarker-Regular.ttf",
  preload: false
})

export const MyLogo = ({
  href,
  showTitle = true,
}: {
  href: string,
  showTitle?: boolean,
}) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(() => {
      router.push(REDIRECT_ROOT)
    })
  }

  return (
    <Link
      href={href}
      className={cn("flex items-center justify-center", isPending && "animate-pulse")}
      onClick={onClick}
    >
      <div className="w-8 h-6 sm:h-7 hover:opacity-75 transition items-center gap-x-2 flex mr-2">
        <Image
          className="w-full h-auto"
          src="/logo.svg"
          alt="Logo"
          width="0"
          height="0"
          sizes="100vw"
          priority={true} />
      </div>
      {showTitle && (
        <p className={cn("hidden sm:block text-lg text-indigo-700 pb-1", headingFont.className)}>
          Indigo Milestones
        </p>)}
    </Link>
  )
}