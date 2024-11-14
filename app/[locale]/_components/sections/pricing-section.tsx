"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useState, useTransition } from "react"
import { CheckCircleIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { REDIRECT_APP } from "@/routes"
import { useMyDialog } from "@/hooks/use-my-dialog"
import { cn } from "@/lib/utils"
import { fetcher } from "@/lib/fetcher"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { FormSubmitError } from "@/components/forms/form-submit-error"
import { MyLoading } from "@/components/my-loading"
import { ConstantParams } from "@/types"
import { Section } from "../section"

export const PricingSection = () => {
  const c = useTranslations("common")

  const searchParams = useSearchParams()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const searchParamsToast = searchParams.get("toast") || undefined

  const { onOpen } = useMyDialog()

  const [isYearly, setIsYearly] = useState(false)
  const [numTeamMembers, setNumTeamMembers] = useState(2)
  const [error, setError] = useState("")

  const { data: constantParams, isFetching } = useQuery<ConstantParams>({
    queryKey: ["constant-params"],
    queryFn: () => fetcher(`/api/constant-params`),
  })

  useEffect(() => {
    switch (searchParamsToast) {
      case "cancel":
        // setError("Payment Canceled.")
        break;
      case "no-payment":
        setError("You have to make a purchase to proceed!")
        break;
      case "member-count-exceed":
        setError("The path already has the maximum number of members.")
        break;
    }
  }, [searchParamsToast])

  useEffect(() => {
    setIsYearly(localStorage.getItem('isYearly') === 'true' || false)

    setNumTeamMembers(Number(localStorage.getItem('numTeamMembers')) || 2)
  }, [])

  useEffect(() => {
    localStorage.setItem('isYearly', (!isYearly).toString())
  }, [isYearly])

  useEffect(() => {
    localStorage.setItem('numTeamMembers', numTeamMembers.toString())
  }, [numTeamMembers])

  if (!constantParams) {
    return <div className="text-center">{c("noData")}</div>
  }

  return (
    <Section isWhiteBackground={false}>
      <div className="md:max-w-screen-2xl mx-auto" id="pricing">
        <h1 className="text-center text-2xl sm:text-4xl font-bold pb-10">Pricing</h1>

        <div className="w-full text-center pb-10">
          {!isYearly && <p className="text-lg sm:text-2xl">Pay <span className="text-yellow-400 font-semibold">Monthly</span></p>}
          {isYearly && <p className="text-lg sm:text-2xl">Pay <span className="text-yellow-400 font-semibold">Yearly</span></p>}
          <Switch checked={isYearly} onCheckedChange={() => {
            setError("")
            setIsYearly(!isYearly)
          }} />
        </div>

        <div className="w-full flex flex-col items-center text-center px-20 pb-10 space-y-2">
          <p className="text-lg sm:text-2xl">Number of members in your team: <span className="text-yellow-400 font-semibold">{numTeamMembers}</span></p>
          <Slider
            className="w-[300px] sm:w-[600px] lg:w-[800px]"
            defaultValue={[numTeamMembers]}
            min={1}
            max={50}
            step={1}
            onValueChange={(data) => {
              setError("")
              setNumTeamMembers(data[0])
            }} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center md:justify-center gap-2">
          <ul className="sm:w-[300px] sm:self-center">
            <li className="flex items-center p-1"><CheckCircleIcon className="mr-2" />{constantParams.maxNumPath} Paths</li>
            <li className="flex items-center p-1"><CheckCircleIcon className="mr-2" />{constantParams.maxNumMilestonesPerYear} Milestones per year</li>
            <li className="flex items-center p-1"><CheckCircleIcon className="mr-2" />{constantParams.maxNumTargetsPerMilestone} Targets per milestone</li>
            <li className="flex items-center p-1"><CheckCircleIcon className="mr-2" />{constantParams.maxNumTasksPerTarget} Dos and Don&apos;ts per target</li>
            {/* <li className="flex items-center p-1"><CheckCircle className="mr-2" />{MAX_NUM_MEMBERS_PER_PATH} Members per Path (*1)</li> */}
            {/* <li className="flex items-center p-1"><CheckCircle className="mr-2" />Email Notifications for Reviews</li> */}
          </ul>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <div className={`relative w-full sm:w-[238px] p-4 border rounded-xl ${numTeamMembers < constantParams.minNumMembersTeamPlan && 'border-yellow-400'}`}>
              {/* <div className="absolute top-0 right-5 -translate-y-3 rounded-full pl-2 pr-2 font-bold bg-red-500">Hot !!</div> */}
              <p className="text-xl font-semibold"><span className="font-bold">Individual</span></p>
              <div className="pt-3">
                <p className="text-md">Up to 2 members per Path</p>
                <p className="text-md">$0</p>
              </div>
              <div className="flex items-baseline pt-10 pb-8 space-x-3">
                <p className="text-5xl font-bold"><span className="text-3xl">$</span>0</p>
                <p>USD</p>
              </div>
              <div className="h-full align-baseline text-end">
                <Button onClick={() => {
                  startTransition(() => {
                    router.push(REDIRECT_APP)
                  })
                }}>
                  {isPending && (
                    <MyLoading className="absolute" size={25} color="white" />
                  )}
                  <span className={cn("block", isPending && "invisible")}>Start free</span>
                </Button>
              </div>
            </div>
            <div className={`w-full h-[280px] sm:w-[238px] p-4 border rounded-xl ${(constantParams.minNumMembersTeamPlan <= numTeamMembers && numTeamMembers <= constantParams.maxNumMembersTeamPlan) && 'border-yellow-400'}`}>
              <p className="text-xl font-semibold"><span className="font-bold">Team</span></p>
              <div className="pt-3">
                <p className="text-md">{constantParams.minNumMembersTeamPlan} - {constantParams.maxNumMembersTeamPlan} members</p>
                <p className="text-md">
                  $<span className="text-yellow-400 font-semibold">{isYearly ? `${constantParams.priceYearlyPerMemberPerMonth}` : `${constantParams.priceMonthlyPerMemberPerMonth}`}</span> /user/month
                </p>
              </div>
              <div className="flex items-baseline pt-10 pb-8 space-x-3">
                <p className="text-5xl font-bold"><span className="text-3xl">$</span>{isYearly ? `${constantParams.priceYearlyPerMemberPerMonth * 12}` : `${constantParams.priceMonthlyPerMemberPerMonth}`}</p>
                <p>USD/user/{isYearly ? 'year' : 'month'}</p>
              </div>
              <div className="align-baseline text-end">
                <Button onClick={() => {
                  if (constantParams.minNumMembersTeamPlan <= numTeamMembers && numTeamMembers <= constantParams.maxNumMembersTeamPlan) {
                    onOpen("LoginForCheckout", {
                      paymentInterval: isYearly ? "year" : "month",
                      numTeamMembers: numTeamMembers
                    })
                  }
                  else {
                    onOpen("Alert", {
                      title: "Attention",
                      message: `The number of team members has to be between ${constantParams.minNumMembersTeamPlan} and ${constantParams.maxNumMembersTeamPlan} to proceed.`
                    })
                  }
                }}>
                  Purchase
                </Button>
              </div>
            </div>
            <div className={`w-full sm:w-[238px] h-[280px] flex flex-col p-4 border rounded-xl ${constantParams.maxNumMembersTeamPlan < numTeamMembers && 'border-yellow-400'}`}>
              <p className="text-xl font-semibold"><span className="font-bold">Custom</span></p>
              <div className="flex-1 pt-3">
                <p className="text-md">more members</p>
              </div>
              <div className="text-end">
                <Button onClick={() => {
                  if (numTeamMembers < constantParams.minNumMembersCustomPlan) {
                    setError(`Number of members has to be at least ${constantParams.minNumMembersCustomPlan} to choose Custom Plan.`)
                  }
                  else {
                    onOpen("ContactSupportForPricing", { numTeamMembers: numTeamMembers })
                  }
                }}>
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-xs sm:text-sm mt-8">
          <div className="w-full sm:w-[620px]">
            {/* <li className="flex gap-x-1">*1<p className="flex-1">You can invite a member to your path. The invitee also has to have an account.</p></li> */}
          </div>
        </div>
      </div>
      {error && (
        <div className="flex justify-center mt-1 sm:mt-2">
          <div className="rounded-md bg-white font-semibold">
            <FormSubmitError message={error} />
          </div>
        </div>
      )}
    </Section>
  )
}