"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditFeilds from "@/app/editForm/_components/EditFeilds"
import { usePathname } from "next/navigation";
import db from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function FormUI({ jsonform ,selectTheme,enableAuth,onUpdatedField,onDeleteFeild}) {

  const path = usePathname();
  const segments = path.split('/'); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const router=useRouter()
  const { isSignedIn } = useUser();

const FormChange = (nameOrEvent, value) => {
  let name, val;

  if (typeof nameOrEvent === "string") {
    // for custom onValueChange (like RadioGroup)
    name = nameOrEvent;
    val = value;
  } else {
    // for normal input change (e.target.name / e.target.value)
    const e = nameOrEvent;
    name = e.target.name;
    val =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;
  }

  console.log(name, val);
  setFormData((prev) => ({ ...prev, [name]: val }));
};




  const FormSubmition = async (event) => {
    event.preventDefault();

    try {
      setLoading(true)
      const res = await db.insert(userResponses).values({
        jsonform: JSON.stringify(formData),
        formId: Number(segments[segments.length - 1]), // '11'
        createdAt: moment().format("DD/MM/YYYY"),
      }).returning();

      
      router.push("/Thankyou")
    } catch (error) {
      console.error("Error inserting:", error);
      setLoading(false)
    }finally{
      setLoading(false)
    }
};


  if (!jsonform || !jsonform.fields) {
    return (
      <p className="text-center text-gray-500 italic mt-10">
        Loading form...
      </p>
    );
  }


  return (
    <div className="flex justify-center items-center px-4 " >
      <div className="rounded-2xl w-[70%] p-8 border shadow-gray-600-500 border-violet-100"  data-theme={selectTheme}>
        <h2 className="text-3xl font-bold text-primary-content text-center mb-6" >
          {jsonform.title || "Untitled Form"}
        </h2>

        <form onSubmit={(event)=>FormSubmition(event)} className="flex flex-col gap-6 ">
          {jsonform.fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label className="font-semibold text-primary-content ">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>

              
              {["text", "email", "number", "password", "date"].includes(
                field.type
              ) && (
                <div className="flex ">
                  <Input
                  type={field.type}
                  name={field.name || ""}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={(e)=>{FormChange(e)}}
                  className="transition-all bg-transparent focus:ring-2 focus:ring-violet-400 focus:border-violet-400 shadow-sm"
                  />
                  {!path.includes("LivePreview") &&
                    <EditFeilds onUpdate={(value)=>{onUpdatedField(value,index)}} onDelete={()=>{onDeleteFeild(index)}}  field={field}/>}
                </div>
              )}

              {/* ✅ Textarea */}
              {field.type === "textarea" && (
                <div className="flex ">
                  <Textarea
                  placeholder={field.placeholder}
                  required={field.required}
                  name={field.name || ""}
                  onChange={(e)=>{FormChange(e)}}
                  className="resize-none bg-transparent transition-all focus:ring-2 focus:ring-violet-400 focus:border-violet-400 shadow-sm"
                  />
                  {!path.includes("LivePreview") &&
                    <EditFeilds onUpdate={(value)=>{onUpdatedField(value,index)}} onDelete={()=>{onDeleteFeild(index)}} field={field}/>}
                </div>
              )}

              {/* ✅ Select Dropdown */}
              {field.type === "select" && (
                <div className="flex">
                  <Select name={field.name || ""} onValueChange={(value) => FormChange(field.name, value)}>
                    <SelectTrigger className="focus:ring-2 focus:ring-violet-400 focus:border-violet-400">
                      <SelectValue
                        placeholder={field.placeholder || field.label}
                      />
                    </SelectTrigger>
                    <SelectContent >
                      {field.options?.map((op, i) => (
                        <SelectItem key={i} value={op}>
                          {op}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!path.includes("LivePreview") &&
                    <EditFeilds onUpdate={(value)=>{onUpdatedField(value,index)}} onDelete={()=>{onDeleteFeild(index)}} field={field}/>}
                </div>
              )}

              {/* ✅ Checkbox Group */}
              {field.type === "checkbox" && (
                <div className="flex flex-col gap-2 pl-2">
                  {field.options?.map((op, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox name={field.name || ""} id={`${field.name}-${i}`} onValueChange={(value) => FormChange(field.name, value)} />
                      <Label
                        htmlFor={`${field.name}-${i}`}
                        className="text-gray-700"
                      >
                        {op}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {/* ✅ Radio Group */}
              {field.type === "radio" && (
                <div className="flex">
                  <RadioGroup name={field.name || ""} className="pl-2" onValueChange={(value) => FormChange(field.name, value)} >
                  {field.options?.map((op, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={op}
                        id={`${field.name}-${i}`}
                      />
                      <Label
                        htmlFor={`${field.name}-${i}`}
                        className="text-gray-700"
                      >
                        {op}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {!path.includes("LivePreview") &&
                  <EditFeilds onUpdate={(value)=>{onUpdatedField(value,index)}} onDelete={()=>{onDeleteFeild(index)}} field={field}/>}
                </div>
              )}
            </div>
          ))}




           {!enableAuth ? (
              // 1️⃣ Auth NOT required → Direct submit button
              <button
                type="submit"
                className="btn btn-primary mt-4 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Form"}
              </button>
            ) : isSignedIn ? (
              // 2️⃣ Auth required AND user signed in → Submit button
              <button
                type="submit"
                className="btn btn-primary mt-4 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Form"}
              </button>
            ) : (
              // 3️⃣ Auth required AND user NOT signed in → Sign-in button
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="btn btn-primary mt-4 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Sign In to Submit
                </button>
              </SignInButton>
            )}


        

        </form>
      </div>
    </div>
  );
}
