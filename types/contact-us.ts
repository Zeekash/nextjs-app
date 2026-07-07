export interface ContactResponse {
    success: boolean;
    message: string;
    data?: {
        contact?: {
            id?: number | string;
            name: string;
            email: string;
            phone_no: string;
            subject: string;
            message: string;
        };
    };
    errors?: Record<string, string[]>;
}