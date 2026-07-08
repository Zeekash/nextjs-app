"use client";

import { useState } from "react";

export default function ReadMoreReview({
    text,
    limit = 170,
    className,
}: {
    text?: string | null;
    limit?: number;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const plainText = String(text || "").replace(/<[^>]*>/g, "");
    const shouldTruncate = plainText.length > limit;
    const visibleText = shouldTruncate && !open ? plainText.slice(0, limit) : plainText;

    return (
        <p className={className}>
            {visibleText}
            {shouldTruncate && !open ? "... " : " "}
            {shouldTruncate && (
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    style={{
                        border: 0,
                        background: "transparent",
                        padding: 0,
                        color: "#000",
                        fontWeight: 700,
                        textDecoration: "underline",
                    }}
                >
                    {open ? "Read Less" : "Read More"}
                </button>
            )}
        </p>
    );
}
