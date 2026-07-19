export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface Destination {
  _id: string;
  title: string;
  short_desc: string;
  full_desc: string;
  price: number;
  location: string;
  category: string;
  rating: number;
  images: string[];
  tags: string[];
}

export interface DestinationsResponse {
  destinations: Destination[];
  page: number;
  pages: number;
  count: number;
}
