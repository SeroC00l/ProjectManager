import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

const initializeStore = () =>
  create<UserState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => {
      console.log("Setting user:", user);
      set({ user });
    },
    setLoggedIn: (isLoggedIn) => {
      console.log("Setting isLoggedIn:", isLoggedIn);
      set({ isLoggedIn });
    },
  }));

let userStore: ReturnType<typeof initializeStore> | null = null;

export const getUserStore = () => {
  if (!userStore) {
    userStore = initializeStore();
  }
  return userStore;
};
