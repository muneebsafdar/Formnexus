"use client";

import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import db from "@/configs";
import { Jsonform, userResponses } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Responses() {
  const [forms, setForms] = useState([]);
  const { user: currentUser } = useUser();
  const [loadingFormId, setLoadingFormId] = useState(null);


  const getUserForms = async () => {
    try {
      if (!currentUser) return;

      // Get all forms created by current user
      const formsRes = await db
        .select()
        .from(Jsonform)
        .where(eq(Jsonform.createdBy, currentUser.primaryEmailAddress?.emailAddress));

      // Get response counts for each form
      const formsWithCounts = await Promise.all(
        formsRes.map(async (form) => {
          const responses = await db
            .select()
            .from(userResponses)
            .where(eq(userResponses.formId, form.id));

          return {
            ...form,
            responseCount: responses.length,
          };
        })
      );

      setForms(formsWithCounts);
    } catch (error) {
      console.error("Error fetching user forms:", error);
    } finally {
      
    }
  };

  useEffect(() => {
    if (currentUser) getUserForms();
  }, [currentUser]);

const handleDownload = async (form) => {
  setLoadingFormId(form.id);
  try {
    const res = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formId, form.id));

    if (!res || res.length === 0) {
      console.warn("No responses found for this form.");
      return;
    }

    const allKeys = new Set();
    const parsedResponses = [];

    res.forEach((response) => {
      try {
        const jsonData = JSON.parse(response.jsonform);
        parsedResponses.push(jsonData);
        Object.keys(jsonData).forEach((key) => allKeys.add(key));
      } catch (err) {
        console.error("Error parsing JSON in response:", err);
      }
    });

    const headers = Array.from(allKeys);
    const csvRows = [headers.join(",")];

    parsedResponses.forEach((response) => {
      const row = headers.map((key) => `"${String(response[key] ?? "").replace(/"/g, '""')}"`);
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title || "form_responses"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading form responses:", error);
  } finally {
    setLoadingFormId(null);
  }
};



  return (

    <div>
       <div className="p-4">
          <h2 className='text-3xl font-black '>Responses</h2>
        </div>


       <div className="p-6 grid gap-6  md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
     
      {forms.length === 0 ? (
        <p className="text-gray-500 text-center w-full">No forms created yet.</p>
      ) : (
        forms.map((form) => {
          let parsedForm;
          try {
            parsedForm = JSON.parse(form.jsonform);
          } catch {
            parsedForm = { title: "Untitled Form" };
          }

          return (
            <div
              key={form.id}
              className="rounded-xl overflow-hidden shadow-md border bg-white"
            >
              {/* Image / Title Section */}
              <div className={`h-36 flex flex-col items-center justify-center bg-gradient-to-r ${form.background!=="bg-white" ? form.background : "bg-gradient-to-r from-purple-500 to-pink-500" } text-white font-semibold text-lg`}>
                <span>{parsedForm.title || "Untitled Form"}</span>
              </div>

              {/* Content Section */}
              <div className="p-4 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-medium text-gray-800 truncate w-40">
                    {parsedForm.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {form.createdAt || "No date"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    🧾 {form.responseCount}{" "}
                    {form.responseCount === 1 ? "Response" : "Responses"}
                  </p>
                </div>

               <Button
                disabled={form.responseCount == 0}
                onClick={() => handleDownload(form)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loadingFormId === form.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Download size={18} />
                    Download
                  </>
                )}
              </Button>

              </div>
            </div>
          );
        })
      )}
    </div>

    </div>
   
  );
}
