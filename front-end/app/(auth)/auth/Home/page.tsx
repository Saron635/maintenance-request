

import React from "react";
import Login from "../_componenets/login";
import Link from "next/link";
import Image from "next/image";

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-slate-50 rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Left Side: Logo and Company Name */}
          <div className="flex flex-col sm:flex-row items-center space-x-4">
            <div className="mb-4 sm:mb-0">
              <Image
                src="/backgroundlessAi.png"
                alt="Logo"
                width={250}
                height={250}
              />
            </div>
            <div className="flex justify-center text-orange-500 text-2xl sm:text-left">
              <h2>Maintenance Request</h2>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
