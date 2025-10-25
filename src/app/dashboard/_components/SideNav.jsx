"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import db from "@/configs";
import { Jsonform } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { BookOpenCheck, MessageSquare, LineChart, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormDialogue from "./FormDialogue";

export default function SideNav() {
  const [formCount, setFormCount] = useState(0);
  const { user: currentUser } = useUser();
  const path = usePathname();

  // Navigation Buttons
  const navButtons = [
    { id: 1, name: "Forms", icon: BookOpenCheck, path: "/dashboard" },
    { id: 2, name: "Responses", icon: MessageSquare, path: "/dashboard/responses" },
    { id: 4, name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
  ];

  // ✅ Fetch only COUNT of forms created by the current user
  const getUserFormCount = async () => {
    try {
      if (!currentUser) return;

      const res = await db
        .select({ count: sql`count(*)` })
        .from(Jsonform)
        .where(eq(Jsonform.createdBy, currentUser.primaryEmailAddress?.emailAddress));

      setFormCount(Number(res[0]?.count) || 0);
    } catch (error) {
      console.error("Error fetching form count:", error);
    }
  };

  useEffect(() => {
    getUserFormCount();
  }, [currentUser]);

  return (
    <div className="shadow-md  h-screen flex flex-col justify-between">
      {/* Nav Links */}
      <div className="flex flex-col gap-2 px-4 py-2">
        {navButtons.map((menu) => (
          <Link
            href={menu.path}
            key={menu.id}
            className={`flex items-center gap-2 hover:bg-purple-700 hover:text-white rounded-md p-2 cursor-pointer ${
              path === menu.path ? "bg-purple-700 text-white" : ""
            }`}
          >
            <menu.icon className="w-5 h-5" />
            {menu.name}
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 fixed bottom-0 text-center border-t">
        <FormDialogue/>
        <Progress max={100} min={0} value={(formCount / 3) * 100} />
        <div className="mt-2 text-sm">
          <strong>{formCount}</strong> out of <strong>3</strong> forms used
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Upgrade for unlimited forms
        </p>
      </div>
    </div>
  );
}
