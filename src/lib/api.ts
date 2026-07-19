import axios from "axios";
import { DestinationsResponse, Destination } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nomadai_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDestinations = async (
  params: string,
): Promise<DestinationsResponse> => {
  const { data } = await api.get(`/destinations?${params}`);
  return data;
};

export const fetchDestinationById = async (
  id: string,
): Promise<{ destination: Destination; related: Destination[] }> => {
  const { data } = await api.get(`/destinations/${id}`);
  return data;
};

export const createDestination = async (
  data: Partial<Destination> | FormData,
) => {
  const res = await api.post("/destinations", data);
  return res.data;
};

export const fetchMyDestinations = async () => {
  const res = await api.get("/destinations/my-listings");
  return res.data;
};

export const deleteDestination = async (id: string) => {
  const res = await api.delete(`/destinations/${id}`);
  return res.data;
};

export default api;
