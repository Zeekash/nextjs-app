export interface Blog {
  id?: number;
  title: string;
  slug: string;
  image?: string;
  featured_image?: string;
  published_at?: string;
  created_at?: string;
  short_description?: string;
  description?: string;
  excerpt?: string;
  status?: string;
}

export interface BlogMetaData {
  posts: {
    data: Blog[];
    current_page?: number;
    last_page?: number;
    total?: number;
  };
  categories?: any[];
  featured_posts?: any[];
}
