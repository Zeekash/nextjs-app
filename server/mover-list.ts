"use server";

import type { MoverListData } from "@/types/mover-list";

function getBaseUrl() {
    const baseUrl = process.env.APP_URL;

    if (!baseUrl) {
        throw new Error("APP_URL is missing in .env.local");
    }

    return baseUrl.replace(/\/$/, "");
}

const emptyMoverList: MoverListData = {
    companies: [],
    search: "",
    count: 0,
    total_company: 0,
    all_states: [],
};

async function safeJson(res: Response) {
    try {
        return await res.json();
    } catch {
        return {};
    }
}

export async function getMoverList(search = ""): Promise<MoverListData> {
    try {
        const url = new URL(`${getBaseUrl()}/mover-list`);

        if (search.trim()) {
            url.searchParams.set("search", search.trim());
        }

        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const data = await safeJson(res);

        if (!res.ok || !data.success) {
            return {
                ...emptyMoverList,
                search,
            };
        }

        return {
            companies: data.data?.companies || [],
            search: data.data?.search || search,
            count: Number(data.data?.count || 0),
            total_company: Number(data.data?.total_company || 0),
            all_states: data.data?.all_states || [],
        };
    } catch {
        return {
            ...emptyMoverList,
            search,
        };
    }
}
