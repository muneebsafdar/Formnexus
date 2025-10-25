"use client";

import { Pencil, Edit3, Share2 } from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function HowItWorks() {
  const { isSignedIn } = useUser();

  const steps = [
    {
      icon: <Pencil className="w-8 h-8 text-pink-600" />,
      title: "Write prompt for your form",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.",
    },
    {
      icon: <Edit3 className="w-8 h-8 text-pink-600" />,
      title: "Edit your form",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.",
    },
    {
      icon: <Share2 className="w-8 h-8 text-pink-600" />,
      title: "Share & Start Accepting Responses",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.",
    },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">How it Works</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus nesciunt eos fugiat.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {!isSignedIn && (
        <div className="mt-10">
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all">
              Get Started Today
            </button>
          </SignInButton>
        </div>
      )}
    </section>
  );
}
