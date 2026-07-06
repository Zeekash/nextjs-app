"use client";

import { useState } from "react";

export default function HomePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance] = useState(0);

  return (
     <section className="relative flex min-h-[700px] items-center justify-center bg-[url('https://mymovingjourney.com/assets/img/final_banner.jpg')] bg-contain bg-center bg-no-repeat md:bg-repeat">
      <div className="absolute inset-0 bg-[rgba(112,157,216,0.15)]"></div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 flex flex-col items-center pt-8 ">

        {/* Heading */}
        <div className="max-w-5xl text-center mb-12">
          <h1 className="text-[28px] md:text-[48px]  urbanfont font-extrabold leading-tight text-[#231f20]">
            Moving Soon? Let&apos;s Make It Surprisingly Simple
          </h1>

          <p className="mt-6 text-[22px] text-[#2f2f2f] max-w-3xl mx-auto">
            Skip the endless searching. Compare verified movers, get quotes fast,
            and move with total confidence.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="mt-2 w-full max-w-5xl rounded-[24px] border-2 border-black/20 bg-white shadow-2xl p-6">

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[22px] font-semibold">
              Let&apos;s Calculate Your Moving Cost!
            </h3>

            <span className="text-xl">
              Moving Distance: {distance} miles
            </span>
          </div>

          {/* Search Box */}
          <div className="bg-[#e2eefd] rounded-full p-3 flex flex-col lg:flex-row gap-4 items-center">

            {/* From */}
            <div className="flex-1 bg-white rounded-full px-6 py-1">
              <label className="block text-lg font-semibold">
                Moving from<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="City or Zip Code"
                className="w-full outline-none text-lg bg-transparent placeholder:text-gray-500"
              />
            </div>

            {/* To */}
            <div className="flex-1 bg-white rounded-full px-6 py-1">
              <label className="block text-lg font-semibold">
                Moving to<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="City or Zip Code"
                className="w-full outline-none text-lg bg-transparent placeholder:text-gray-500"
              />
            </div>

            {/* Button */}
            <button className="Primary-bg rounded-full px-10 py-3 text-2xl font-normal text-white whitespace-nowrap">
              Calculate Cost Now
            </button>

          </div>

          <p className="text-center mt-5 text-lg">
            Your personal information is always safe and encrypted.
          </p>

        </div>

      </div>


      {/* Review Card */}
      
    </section>
  );
}