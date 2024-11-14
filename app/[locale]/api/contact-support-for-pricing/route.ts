import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  return NextResponse.json({ data: "Thank you for your inquiry!" })
}