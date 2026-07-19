import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
        localStorage.setItem("nomadai_token", token);
        document.cookie = `nomadai_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("nomadai_token");
        document.cookie = "nomadai_token=; path=/; max-age=0";
        signOut(auth).catch(() => {});
        set({ user: null, token: null });
      },
    }),
    { name: "nomadai-auth" },
  ),
);
