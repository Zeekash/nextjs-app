"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") || "Company registered successfully.";
    const company = searchParams.get("company") || "";

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-[540px] rounded-[20px] bg-white p-8 shadow-xl text-center md:p-12">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f4f1]">
                    <svg
                        className="h-10 w-10 text-[#126987]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-[28px] font-bold text-[#111827] md:text-[34px]">
                    Thank You!
                </h1>

                <p className="mt-3 text-[17px] leading-7 text-gray-600">
                    {company && (
                        <span className="block font-semibold text-[#126987]">
                            {company}
                        </span>
                    )}
                    {message}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md bg-[#126987] px-7 py-3 text-[15px] font-medium text-white transition hover:bg-[#0d5570]"
                    >
                        Go to Homepage
                    </Link>

                    <Link
                        href="/company/register"
                        className="inline-flex items-center justify-center rounded-md border border-[#126987] px-7 py-3 text-[15px] font-medium text-[#126987] transition hover:bg-[#f0f9fb]"
                    >
                        Register Another Company
                    </Link>
                </div>
            </div>
        </main>
    );
}
