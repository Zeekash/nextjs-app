"use server";

import type { ContactResponse } from "@/types/contact-us";

function getBaseUrl() {
    const baseUrl = process.env.APP_URL;

    if (!baseUrl) {
        throw new Error("APP_URL is missing in .env.local");
    }

    return baseUrl.replace(/\/$/, "");
}

async function safeJson(res: Response) {
    try {
        return await res.json();
    } catch {
        return {};
    }
}

export async function sendContactMessage(
    formData: FormData
): Promise<ContactResponse> {
    try {
        const payload = {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone_no: String(formData.get("phone_no") || "").trim(),
            subject: String(formData.get("subject") || "").trim(),
            message: String(formData.get("message") || "").trim(),
        };

        const res = await fetch(`${getBaseUrl()}/contact-us`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        const data = await safeJson(res);

        return {
            success: Boolean(res.ok && data.success),
            message: data.message || "Request completed.",
            data: data.data,
            errors: data.errors,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Unable to connect with Laravel API.",
            errors: {
                server: [error?.message || "Unable to connect with Laravel API."],
            },
        };
    }
}