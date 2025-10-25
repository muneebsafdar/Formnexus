"use client";
import { CheckCircle } from "lucide-react";


export default function SuccessPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
        <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Success!</h2>
        <p className="text-gray-600">Your form has been submitted successfully!</p>
      </div>
    </div>
  );
}
