import { NextRequest, NextResponse } from "next/server";
import { affiliates } from "@/lib/affiliates";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ partner: string }> }
) {
  const { partner } = await params;
  const affiliate = affiliates[partner];

  if (!affiliate) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(affiliate.url, { status: 302 });
}
