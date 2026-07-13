export interface ResourcePage {
  id: number;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  full_service_content: string;
  other_service_content: string;
  upper_content: string;
  middle_content: string;
  bottom_content: string;
  created_at: string;
  updated_at: string;
  publish_by: number;
}

export interface ResourceTopMover {
  id: number;
  resource_page_id: number;
  company_id: number;
  heading: string;
  position: string;
  status: string;
  created_at: string;
  updated_at: string;
  point_one: string;
  point_two: string;
  point_three: string;
}

export interface ResourceBottomMover {
  id: number;
  resource_page_id: number;
  company_id: number;
  heading: string;
  point_one: string;
  point_two: string;
  point_three: string;
  content: string;
  position: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ResourceCompanyState {
  id: number;
  name: string;
  abv: string;
}

export interface ResourceCompanyCity {
  id: number;
  name: string;
}

export interface ResourceCompany {
  id: number;
  company_name: string;
  image: string;
  slug: string;
  us_dot_no: string;
  icc_mc_license_no: string;
  is_claimed: number;
  local_mover: number;
  long_distance_mover: number;
  phone_no: string;
  company_website: string;
  street: string;
  state_id: number;
  city_id: number;
  total_reviews: number;
  average_rating: number | null;
  average_price: number | null;
  state: ResourceCompanyState;
  city: ResourceCompanyCity;
}

export interface ResourceFaq {
  id: number;
  resource_page_id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface ResourcePageResponse {
  resourcePage: ResourcePage;
  top_movers: ResourceTopMover[];
  bottom_movers: ResourceBottomMover[];
  other_movers: ResourceTopMover[];
  companies: ResourceCompany[];
  best_state_pages: unknown[];
  faqs: ResourceFaq[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
