"use client";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4 sm:p-8 md:p-16">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        .float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 text-center fade-in">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Welcome to Super XO
        </span>
      </h1>

      <div
        className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-10 md:mb-12 text-center fade-in max-w-md sm:max-w-lg md:max-w-xl"
        style={{ animationDelay: "0.2s" }}
      >
        Experience the classic game with a twist! Challenge your friends and
        test your strategy.
      </div>
      <Link href="/xo">
        <div className="float" style={{ animationDelay: "0.4s" }}>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full text-lg sm:text-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg">
            Go to XO Game
          </button>
        </div>
      </Link>

      <div
        className="mt-12 sm:mt-16 text-gray-600 text-center fade-in max-w-md sm:max-w-lg md:max-w-xl"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="text-sm sm:text-base">
          Set your move limit, challenge your friends, and enjoy the game!
        </p>
      </div>

      <div
        className="mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <p>© 2024 Super XO. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
