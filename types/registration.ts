export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: {
        company?: any;
    };
    errors?: Record<string, string[]>;
}

export interface StateOption {
    id: number | string;
    name: string;
}

export interface CityOption {
    id: number | string;
    name: string;
    zip_code?: string | number | null;
}