"use client"
import { SignedIn, SignIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from "@/app/dashboard/_components/SideNav"

export default function DashboradLayout({children}) {

  
  return (
     <SignedIn>

      <div className='flex '>

        <div className='md:w-64'>
          <SideNav/>
        </div>
        <div className='w-full overflow-y-scroll no-scrollbar  h-screen '>
            {children}
        </div>

      </div>
    </SignedIn>
  )
}
