import Link from "next/link"
import Image from "next/image"
import { NextFont } from "next/dist/compiled/@next/font"
import { FaSquareXTwitter } from "react-icons/fa6"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Section } from "../section"

interface FooterProps {
  headingFont: NextFont
}

export const Footer = ({
  headingFont
}: FooterProps) => {
  return (
    <Section isWhiteBackground={true}>
      <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-between w-full pb-10 text-sm">
        <div>
          <div className="w-8 hover:opacity-75 transition items-center gap-x-2 hidden sm:flex mr-2">
            <Image
              className="w-full h-auto"
              src="/logo.svg"
              alt="Logo"
              width="0"
              height="0"
              sizes="30vw"
              priority={true} />
          </div>
          <p className={cn("text-lg text-indigo-700 pb-1", headingFont.className)}>
            Indigo Milestones
          </p>
          <p className="text-xs">For all the indie people</p>
          <p className="text-xs">Made with Love</p>
        </div>
        <div className="flex flex-col items-start">
          <Button variant="ghost" size="sm">
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center">
          <p className="text-sm">Follow the Developer:</p>
          <Link href="https://twitter.com/takahide_sato"><FaSquareXTwitter className="w-6 h-6 ml-1" /></Link>
        </div>
        <p className="text-xs">Copyright 2024 - All right reserved</p>
      </div>
    </Section>
  )
}