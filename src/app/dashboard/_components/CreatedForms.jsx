"use client";

import React, { useEffect, useState } from "react";
import db from "@/configs";
import { eq } from "drizzle-orm";
import { Jsonform } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { Share2, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { RWebShare } from "react-web-share";



export default function CreatedForms() {
  const [forms, setForms] = useState([]);
  const { user: currentUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getUserForms = async () => {
    setLoading(true)
    try {
      if (!currentUser) return;

      const res = await db
        .select()
        .from(Jsonform)
        .where(
          eq(Jsonform.createdBy, currentUser.primaryEmailAddress?.emailAddress)
        );

      setForms(res);
    } catch (error) {
      console.error("Error fetching user forms:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (currentUser) getUserForms();
  }, [currentUser]);

  const handleShare = (id) => {
    // const link = `${window.location.origin}/LivePreview/${id}`;
    // navigator.clipboard.writeText(link);
    toast("Link copied!.")
  };

  const handleEdit = (id) => {
    router.push(`/editForm/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await db.delete(Jsonform).where(eq(Jsonform.id, Number(id)));
      setForms((prev) => prev.filter((form) => form.id !== id));
      toast("Form Deleted Successfully.")

    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {forms.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          No forms created yet.
        </p>
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
              <div
                className={`h-36 flex flex-col items-center justify-center text-white font-semibold text-lg ${form.background!=="bg-white" ? form.background : "bg-gradient-to-r from-purple-500 to-pink-500" }`}
              >
                <span>{parsedForm.title || "Untitled Form"}</span>
              </div>

              {/* Details Section */}
              <div className="p-4 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-medium text-gray-800 truncate w-40">
                    {parsedForm.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {form.createdAt || "No date"}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* Share Button */}

                  <RWebShare
                    data={{
                      text: `${parsedForm.title} Build you form With FormNexus `,
                      url: `${process.env.NEXT_PUBLIC_BASE_URL}/LivePreview/${form.id}`,
                      title: parsedForm.title
                    }}
                    onClick={() => handleShare()}
                  >
                    <button
                      className="p-2 rounded-md bg-blue-100 hover:bg-blue-200"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4 text-blue-600" />
                    </button>
                  </RWebShare>
                  

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(form.id)}
                    className="p-2 rounded-md bg-green-100 hover:bg-green-200"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-green-600" />
                  </button>

                  {/* Delete with Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="p-2 rounded-md bg-red-100 hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-52">
                      <p className="text-sm text-gray-700 mb-3">
                        Are you sure you want to delete this form?
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {handleDelete(form.id)}}
                        >
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
