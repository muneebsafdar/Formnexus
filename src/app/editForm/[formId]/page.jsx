"use client"
import db from '@/configs'
import { useUser } from '@clerk/nextjs'
import { and,eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {Jsonform} from "@/configs/schema"
import { ArrowLeft, Eye, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormUI from "@/app/editForm/_components/FormUI"
import Controller from "@/app/editForm/_components/Controller"
import {Button} from "@/components/ui/button"


export default function EditPage({params}) {


  const resolvedParams = React.use(params); // ✅ unwrap the promise
  const formId = resolvedParams.formId;

  const {user:currentUser}=useUser();
  const [jsonform,setJsonform]=useState({})
  const router=useRouter()
  const [triggerUpdate,setTriggerUpdate]=useState(0)
  const [Record,setrecord]=useState([])
  const [selectTheme,setSelectTheme]=useState('light')
  const [gradient,setGradient]=useState('')
  const [enableAuth,setEnableAuth]=useState()



  useEffect(()=>{
    currentUser && getFormData()
  },[currentUser])


  const getFormData=async()=>{

    const res=await db.select().from(Jsonform)
    .where(and(eq(Jsonform.id,formId),eq(Jsonform.createdBy,currentUser?.primaryEmailAddress?.emailAddress)))
    console.log(res[0]);
    
    setJsonform(JSON.parse(res[0].jsonform))
    setGradient(res[0].background)
    setSelectTheme(res[0].theme)
    setEnableAuth(res[0].enabeAuth)    
    setrecord(res[0])
  }

  useEffect(()=>{
    if (triggerUpdate) {
      setJsonform(jsonform)
      UpdateForm()
    }
  },[triggerUpdate])


  const UpdateForm=async ()=>{
    const res=await db.update(Jsonform).set({
      jsonform:jsonform,
    }).where(and(eq(Jsonform.id,Record.id),eq(Jsonform.createdBy,currentUser?.primaryEmailAddress?.emailAddress)))
    console.log(res)
  }

  const updateTheme = async ()=>{
    const res=await db.update(Jsonform).set({
      theme:selectTheme,
    }).where(and(eq(Jsonform.id,Record.id),eq(Jsonform.createdBy,currentUser?.primaryEmailAddress?.emailAddress)))
    console.log(res)
  }
  const updateIsAuthReq = async ()=>{

    const res=await db.update(Jsonform).set({
      enabeAuth:enableAuth
    }).where(and(eq(Jsonform.id,Record.id),eq(Jsonform.createdBy,currentUser?.primaryEmailAddress?.emailAddress)))
      
  }

  
  const updateBackground = async ()=>{ 
    const res=await db.update(Jsonform).set({
      background:gradient
    }).where(and(eq(Jsonform.id,Record.id),eq(Jsonform.createdBy,currentUser?.primaryEmailAddress?.emailAddress)))
    console.log(res)
      
  }


  const onUpdatedField=(value,index)=>{
    
    jsonform.fields[index].label=value.label
    if (value?.Placeholder ) {
       jsonform.fields[index].placeholder=value.Placeholder;
    }
    setTriggerUpdate(Date.now())
  }

  const onDeleteFeild= (index)=>{
    jsonform.fields.splice(index, 1);
    setTriggerUpdate(Date.now())
  }

  useEffect(()=>{
    updateTheme()
  },[selectTheme])

  useEffect(()=>{
    updateBackground()
  },[gradient])
  
  useEffect(()=>{
    if (enableAuth !== undefined) {
      updateIsAuthReq()
    }
  },[enableAuth])


  return (
   <div className='p-4 my-4 flex flex-col gap-4'>

    <div className='flex justify-end items-center gap-3 p-2'>
      <Button
        onClick={() => window.open(`/LivePreview/${formId}`, "_blank")}
        variant="outline"
      > <Eye /> Live Preview
      </Button>
    </div>

    <div className='flex gap-10'>
    <div className='w-[40%] shadow-2xl h-full rounded-2xl border border-violet-100  p-2  justify-center'>
      <h2 className="flex gap-2 justify-center items-center cursor-pointer transition-all duration-100 hover:-translate-x-2 hover:scale-105 " >
        <ArrowLeft onClick={()=>{router.back()}} size={24} className="transition-transform duration-100" />Back
      </h2>
    <Controller selectedGradient={(value)=>setGradient(value)} enableAuth={enableAuth} setEnableAuth={setEnableAuth} setSelectTheme={setSelectTheme}/>
    </div>

    <div className={`w-full shadow-2xl h-full rounded-2xl border border-violet-100 flex flex-col justify-center   p-4 ${gradient}`}>
      {
        jsonform && <FormUI gradient={gradient} enableAuth={enableAuth} selectTheme={selectTheme} jsonform={jsonform}  onUpdatedField={onUpdatedField} onDeleteFeild={onDeleteFeild} />
      }
    </div>
    </div>

   </div>
  )
}
