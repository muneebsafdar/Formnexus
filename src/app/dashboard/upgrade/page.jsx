"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import {pricingPlans as plans} from "@/app/dashboard/upgrade/pricingplanes"

export default function Upgrade() {
  

  return (
    <div className="min-h-screen py-16 px-6 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Upgrade Your Plan</h1>
        <p className="text-gray-600">
          Choose the plan that fits your workflow and unlock premium features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header */}
            <div
              className={`text-center bg-gradient-to-r ${plan.color} text-white rounded-xl py-6 mb-6`}
            >
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="text-3xl font-bold mt-2">{plan.price}</p>
              <p className="text-sm opacity-90 mt-1">{plan.description}</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
           <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Now
              </a>
            </Button>

          </div>
        ))}
      </div>
    </div>
  );
}
