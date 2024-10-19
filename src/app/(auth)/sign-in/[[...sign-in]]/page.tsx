"use client"

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return (
    <SignIn 
      path="/sign-in" 
      routing="path"
      signUpUrl="/sign-up"
      afterSignInUrl={redirect}
    />
  );
}