"use client";

import React from "react";
import { SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="py-4 px-2 shadow-md flex justify-between items-center">
      <div className="p-1 w-full ">
        <Image src="/logo.svg" alt="Vercel Logo" width={200} height={24} />
      </div>

      {isSignedIn ?

        <div className="flex gap-2">
          <Link href={"/dashboard"}>
            <Button variant="outline">Dashborad</Button>
          </Link>
          <UserButton/>
        </div>

        :
        <SignInButton>
          <Button>Get Started</Button>
        </SignInButton>
      }
    
    </div>
  );
}
