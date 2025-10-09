"use client"
import { SignedIn, SignIn } from '@clerk/nextjs'
import React from 'react'

export default function DashboradLayout({children}) {
  return (
    <div>
     <SignedIn>
         {children}
     </SignedIn>
    </div>
  )
}
