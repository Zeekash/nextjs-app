"use server";

import type {
    RegisterResponse,
    StateOption,
    CityOption,
} from "@/types/registration";

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

export async function registerCompany(
    formData: FormData
): Promise<RegisterResponse> {
    try {
        const res = await fetch(`${getBaseUrl()}/company/register`, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
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

export async function getStates(): Promise<StateOption[]> {
    try {
        const res = await fetch(`${getBaseUrl()}/states`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const data = await safeJson(res);

        if (!res.ok || !data.success) {
            console.log("States API error:", data);
            return [];
        }

        return data.states || [];
    } catch (error) {
        console.log("States fetch error:", error);
        return [];
    }
}

export async function getCitiesByState(
    stateId: string | number
): Promise<CityOption[]> {
    if (!stateId) return [];

    try {
        const url = new URL(`${getBaseUrl()}/fetch-cities`);
        url.searchParams.set("state_id", String(stateId));

        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const data = await safeJson(res);

        if (!res.ok || !data.success) {
            console.log("Cities API error:", data);
            return [];
        }

        return data.cities || [];
    } catch (error) {
        console.log("Cities fetch error:", error);
        return [];
    }
}