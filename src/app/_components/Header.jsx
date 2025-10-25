"use client";

import React, { useState, useEffect } from "react";
import { SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);

  const handleDashboardClick = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  // Reset loading once path changes
  useEffect(() => {
    setLoading(false);
  }, [path]);

  if (path.includes("LivePreview") || path.includes("Thankyou")) return null;

  return (
    <div className="py-4 px-2 shadow-md flex justify-between items-center">
      <div className="p-1 w-full">
        <Image src="/logo.svg" alt="Logo" width={200} height={24} />
      </div>

      {isSignedIn ? (
      <div className="flex gap-2 items-center">
        {!path.startsWith("/dashboard") && (
          <Button
            variant="outline"
            onClick={handleDashboardClick}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : (
              "Dashboard"
            )}
          </Button>
        )}
        <UserButton />
      </div>
    ) : (
      <SignInButton>
        <Button>Get Started</Button>
      </SignInButton>
    )}

    </div>
  );
}
