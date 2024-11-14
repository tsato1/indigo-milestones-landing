import { NextResponse } from "next/server";

import { ConstantParams } from "@/types";

export async function GET(req: Request) {
  return NextResponse.json({
    minNumMembersTeamPlan: 1,
    maxNumMembersTeamPlan: 2,
    minNumMembersCustomPlan: 3,
    maxNumMembersCustomPlan: 4,

    priceMonthlyPerMemberPerMonth: 5,
    priceYearlyPerMemberPerMonth: 6,

    maxNumPath: 7,
    maxNumMilestonesPerYear: 8,
    maxNumTargetsPerMilestone: 9,
    maxNumTasksPerTarget: 1,
  } as ConstantParams);
}