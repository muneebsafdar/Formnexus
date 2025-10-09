"use client"
import { SignIn } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';


export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlogan, setCurrentSlogan] = useState(0);

  const slogans = [
    "Welcome Back!",
    "Your Journey Continues",
    "Great to See You Again"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side - Interactive Visual */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated background circles */}
        <div className="absolute inset-0">
          <div
            className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-transform duration-500"
            style={{
              left: `${mousePosition.x * 20}%`,
              top: `${mousePosition.y * 20}%`,
              transform: `translate(-50%, -50%)`,
            }}
          />
          <div
            className="absolute w-64 h-64 bg-blue-300/20 rounded-full blur-2xl transition-transform duration-700"
            style={{
              right: `${mousePosition.x * 15}%`,
              bottom: `${mousePosition.y * 15}%`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          {/* Logo/Icon */}
          <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Animated Slogan */}
          <h1
            key={currentSlogan}
            className="text-5xl font-bold mb-4 text-center animate-fade-in"
          >
            {slogans[currentSlogan]}
          </h1>

          <p className="text-xl text-white/80 text-center max-w-md">
            Access your dashboard and manage everything in one place
          </p>

          {/* Floating elements */}
          <div className="mt-12 flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          {/* Placeholder for Clerk Auth Form */}
          <SignIn />
          {/* Footer */}


        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}