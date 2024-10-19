"use client"

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return (
    <SignUp 
      path="/sign-up" 
      routing="path"
      signInUrl="/sign-in"
      afterSignUpUrl={redirect}
    />
  );
}