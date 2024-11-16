import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  draftMode().disable();
  return NextResponse.redirect(new URL("/", request.url));
}
