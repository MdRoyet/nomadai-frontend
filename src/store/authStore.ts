import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        // Save to localStorage for client-side API calls
        localStorage.setItem("nomadai_token", token);
        // Save to cookie for Next.js middleware
        document.cookie = `nomadai_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("nomadai_token");
        // Clear cookie
        document.cookie = "nomadai_token=; path=/; max-age=0";
        set({ user: null, token: null });
      },
    }),
    { name: "nomadai-auth" },
  ),
);
