"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import provideFullPrompt from "@/configs/prompt";
import { useUser } from "@clerk/nextjs";
import moment from "moment"; // ✅ make sure moment is installed
import db from "@/configs/index";
import { Jsonform } from "@/configs/schema"; // ✅ import your Drizzle table
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"







export default function FormDialogue() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [userDescription, setUserDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useUser();
  const route=useRouter()



  const createForm = async () => {
    if (!userDescription) return;

    setLoading(true);

    try {
      // 🧠 1. Prepare the AI prompt
      const finalPrompt = provideFullPrompt(userDescription);

      // 🤖 2. Send prompt to Gemini API route
      const result = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      console.log(result);
      

      const json = await result.json();
      const data = json?.text?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (data) {
        // 🧾 3. Save AI-generated JSON to database
        const res = await db
          .insert(Jsonform)
          .values({
            jsonform: data,
            createdBy: currentUser?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/YYYY"),
            theme:"light",
            background:"bg-white",
            enabeAuth:false
          })
          .returning({ id: Jsonform.id });

        if(res[0].id)
        {
          toast("Form Created Succesfully.")
          route.push(`/editForm/${res[0].id}`)
        }
       
      } else {
        toast("Error While creating form.")
      }
    } catch (error) {
      toast("Error While creating form.")
      console.log(error);
      
    } finally {
      setLoading(false);
      setOpenDialogue(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenDialogue(true)}
        className="my-2 p-2 cursor-pointer"
      >
        + Create Form
      </Button>

      <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Please describe your form below.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Textarea
              onChange={(e) => setUserDescription(e.target.value)}
              placeholder="Write the description of your form"
            />

            <div className="p-3 flex justify-end">
              <Button
                onClick={createForm}
                disabled={loading}
                className="my-2 mx-2 p-2 font-bold"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create"}
              </Button>

              <Button
                onClick={() => setOpenDialogue(false)}
                className="my-2 mx-2 p-2 font-bold"
                variant="destructive"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
