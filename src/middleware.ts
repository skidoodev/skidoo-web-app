// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req, evt) => {
  const { userId } = auth;
  const path = req.nextUrl.pathname;

  if (path === "/" || path.startsWith("/quiz")) {
    return NextResponse.next();
  }

  if (!userId && !path.startsWith("/sign-in") && !path.startsWith("/sign-up")) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};