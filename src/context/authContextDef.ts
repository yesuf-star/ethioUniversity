import { createContext } from "react";
import type { UserProfile, RegisterInput } from "../types/user";

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithMoeId: (
    moeId: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    input: RegisterInput
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (
    updates: Partial<UserProfile>
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
