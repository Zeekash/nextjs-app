"use client";

import { useState } from "react";

export default function MovingCalculator({
    bgColor = "#FFFFFF",
}) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [distance, setDistance] = useState(0);

    return (
        <div
            style={{ backgroundColor: bgColor }}
            className="mt-2 w-full max-w-5xl rounded-[24px] border-2 border-black/20 shadow-2xl p-4 md:p-6"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-2">
                <h3 className="text-lg md:text-[22px] font-semibold text-center sm:text-left">
                    Let's Calculate Your Moving Cost!
                </h3>

                <span className="text-sm md:text-xl text-[#374151]">
                    Moving Distance: {distance} miles
                </span>
            </div>

            <div className="bg-[#E2EEFD] rounded-2xl lg:rounded-full p-3 flex flex-col lg:flex-row gap-4 items-stretch lg:justify-between lg:items-center">
                {/* Moving From */}





                    <div className="flex-1  bg-white rounded-xl lg:rounded-full px-4 md:px-4 py-2">
                        <label className="block text-sm md:text-lg font-semibold">
                            Moving From <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            placeholder="Enter City or ZIP Code"
                            className="w-full outline-none text-base md:text-lg bg-transparent placeholder:text-gray-500"
                        />
                    </div>

                    {/* Moving To */}
                    <div className="flex-1  bg-white rounded-xl lg:rounded-full px-4 md:px-4 py-2">
                        <label className="block text-sm md:text-lg font-semibold">
                            Moving To <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="Enter City or ZIP Code"
                            className="w-full outline-none text-base md:text-lg bg-transparent placeholder:text-gray-500"
                        />
                    </div>

                {/* Button */}
                <button
                    className="bg-[#116087]  flex[0.9] text-white text-[22px] font-light cursor-pointer px-6 py-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#116087] transition-all duration-300 w-full lg:w-auto"
                >
                    Calculate Cost Now
                </button>
            </div>

            <p className="text-center mt-5 text-sm md:text-lg">
                Your personal information is always safe and encrypted.
            </p>
        </div>
    );
}