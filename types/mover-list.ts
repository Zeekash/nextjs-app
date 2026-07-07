export interface MoverCompany {
    id: number | string;
    company_name: string;
    slug: string;
    highlighted_name?: string;
    user_average_rating?: number | string | null;
    image?: string | null;
    state_id?: number | string | null;
    city_id?: number | string | null;
    [key: string]: unknown;
}

export interface MoverState {
    id?: number | string;
    slug: string;
    state: string;
    company_count?: number | string;
}

export interface MoverListData {
    companies: MoverCompany[];
    search: string;
    count: number;
    total_company: number;
    all_states: MoverState[];
}

export interface MoverListApiResponse {
    success: boolean;
    message: string;
    data: MoverListData;
}
