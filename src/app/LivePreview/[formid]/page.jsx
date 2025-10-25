"use client"

import React, { useEffect, useState } from 'react'
import db from '@/configs'
import { eq } from 'drizzle-orm'
import { Jsonform } from "@/configs/schema"
import FormUI from "@/app/editForm/_components/FormUI"
import Link from 'next/link'

export default function LivePreview({ params }) {
  const resolvedParams = React.use(params); // ✅ unwrap the promise
  const formId = resolvedParams.formid;

  const [jsonform, setJsonform] = useState({})
  const [selectTheme, setSelectTheme] = useState()
  const [gradient, setGradient] = useState('')
  const [enableAuth,setEnableAuth]=useState()
    


  const getFormData = async () => {
    const res = await db.select().from(Jsonform)
      .where(eq(Jsonform.id, Number(formId)))

    setJsonform(JSON.parse(res[0].jsonform))
    setGradient(res[0].background)
    setSelectTheme(res[0].theme)
    setEnableAuth(res[0].enabeAuth) 
  }

  useEffect(() => {
    getFormData()
  }, [])

  return jsonform && (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Main Content */}
      <div className={`${gradient} md:w-[60%] p-3 my-3 rounded w-full`}>
        <FormUI jsonform={jsonform} selectTheme={selectTheme} enableAuth={enableAuth} />
      </div>

      <Link
        href={process.env.NEXT_PUBLIC_BASE_URL} 
        target="_blank"                  
        className="fixed bottom-2 left-20"
      >
        <img
          src="/logo.svg"
          alt="Watermark Logo"
          className="w-[100px]  lselect-none  transition-opacity duration-300"
        />
      </Link>
    </div>
  )
}
