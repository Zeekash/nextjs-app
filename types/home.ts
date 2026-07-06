export interface Featured {
  id: number;
  company_name: string;
  city: string;
  state: string;
  average_rating: number;
}

export interface Company {
  id: number;
  company_name: string;
  slug: string;
  image: string;
}

export interface State {
  slug: string;
  state: string;
  company_count: number;
}

export interface City {
  zip_code: string;
  name: string;
  total: number;
}

export interface Post {
  id: number;
  title: string;
}

export interface HomeResponse {
  featured: Featured[];
  companies: Company[];
  states: State[];
  company_city: City[];
  posts: Post[];
  blogs: Post[];
  topStates: State[];
}