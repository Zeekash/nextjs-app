export type AnyRecord = Record<string, any>;

export type City = {
    id?: number | string;
    name?: string | null;
    slug?: string | null;
    zip_code?: string | number | null;
};

export type State = {
    id?: number | string;
    name?: string | null;
    state?: string | null;
    abv?: string | null;
    slug?: string | null;
};

export type Company = AnyRecord & {
    id: number | string;
    company_name: string;
    slug: string;
    image?: string | null;
    logo?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    company_email?: string | null;
    phone_no?: string | null;
    additional_phone_no?: string | null;
    company_website?: string | null;
    street?: string | null;
    about_company?: string | null;
    company_info?: string | null;
    founding_year?: string | number | null;
    us_dot_no?: string | number | null;
    icc_mc_license_no?: string | number | null;
    trucks?: string | number | null;
    is_claimed?: number | boolean | null;
    updated_at?: string | null;
    city?: City | null;
    state?: State | null;
};

export type Review = AnyRecord & {
    id: number | string;
    name?: string | null;
    overall_rating?: number | string | null;
    review_subject?: string | null;
    your_review?: string | null;
    message?: string | null;
    review?: string | null;
    move_size?: string | null;
    service_cost?: string | number | null;
    respond?: string | null;
    created_at?: string | null;
    pickCity?: City | null;
    pick_city?: City | null;
    pickState?: State | null;
    pick_state?: State | null;
    deliveryCity?: City | null;
    delivery_city?: City | null;
    DeliveryState?: State | null;
    delivery_state?: State | null;
};

export type CompanyFaq = {
    id?: number | string;
    question?: string | null;
    answer?: string | null;
};

export type ComparisonCompany = Company & {
    average_rating?: number;
    average_price?: number;
    total_reviews?: number;
};

export type CompanyShowData = {
    company: Company;
    current_date?: string;
    faq?: CompanyFaq[];
    admins?: AnyRecord[];
    latest_posts?: AnyRecord[];
    selected_review?: Review | null;
    state_options?: Review[];
    unique_states?: Review[];
    stats: {
        total_reviews: number;
        total_rated_reviews?: number;
        total_rating?: number;
        average_rating: number;
        total_cost?: number;
        average_cost: number;
        min_price?: number | string | null;
        max_price?: number | string | null;
        min_rating?: number | string | null;
        max_rating?: number | string | null;
    };
    star_breakdown: {
        star_5: { count: number; percentage: number };
        star_4: { count: number; percentage: number };
        star_3: { count: number; percentage: number };
        star_2: { count: number; percentage: number };
        star_1: { count: number; percentage: number };
    };
    sentiment: {
        negative_reviews: number;
        positive_reviews: number;
        negative_percentage: number;
        positive_percentage: number;
    };
    reviews: {
        data: Review[];
        pagination: {
            current_page: number;
            per_page: number;
            total: number;
            last_page: number;
            from?: number | null;
            to?: number | null;
            links?: {
                first?: string | null;
                last?: string | null;
                prev?: string | null;
                next?: string | null;
            };
        };
    };
    comparison_companies?: ComparisonCompany[];
};

export type CompanyShowApiResponse = {
    success: boolean;
    message?: string;
    data: CompanyShowData;
};

export type CompanyDetails = {
  id: number;
  label: string;
  value: string;
  slug: string;
  image: string | null;
  address: string | null;
  website: string | null;
  phone: string | null;
  additional_phone: string | null;
};

export type CompaniesResponse = {
  data: CompanyDetails[];
  current_page: number;
  last_page: number;
  links?: string;
};


