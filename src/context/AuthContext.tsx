import React, { useState } from "react";
import type { UserProfile, RegisterInput, AcademicStream } from "../types/user";
import { AuthContext } from "./authContextDef";

interface StoredAccount extends UserProfile {
  passwordHash: string;
}

const STORAGE_USERS_KEY = "ethio_univ_users";
const STORAGE_CURRENT_USER_KEY = "ethio_univ_current_user";

// Default demo Grade 12 student account
const DEFAULT_DEMO_ACCOUNT: StoredAccount = {
  id: "moe-student-demo-1",
  fullName: "Abebe Kebede Tadesse",
  email: "abebe.kebede@student.edu.et",
  moeId: "MOE-847291",
  region: "Oromia",
  zone: "East Shewa",
  stream: "natural",
  score: 415,
  phoneNumber: "+251 91 123 4567",
  passwordHash: "password123",
  preferredUniversities: ["aau-1", "aastu-2"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state lazily from localStorage
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const storedUsersRaw = localStorage.getItem(STORAGE_USERS_KEY);
      if (!storedUsersRaw) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify([DEFAULT_DEMO_ACCOUNT]));
      }

      const activeUserRaw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (activeUserRaw) {
        return JSON.parse(activeUserRaw);
      }
    } catch (err) {
      console.error("Failed to initialize auth storage", err);
    }
    return null;
  });

  const [isLoading] = useState<boolean>(false);

  const getStoredAccounts = (): StoredAccount[] => {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      if (!raw) return [DEFAULT_DEMO_ACCOUNT];
      return JSON.parse(raw);
    } catch {
      return [DEFAULT_DEMO_ACCOUNT];
    }
  };

  const saveStoredAccounts = (accounts: StoredAccount[]) => {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
  };

  const setSessionUser = (profile: UserProfile | null) => {
    setUser(profile);
    if (profile) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  };

  // Login with Ministry of Education (MoE) ID card
  const loginWithMoeId = async (
    moeId: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedId = moeId.trim().toUpperCase();
    const accounts = getStoredAccounts();

    const matched = accounts.find(
      (acc) => acc.moeId.toUpperCase() === trimmedId
    );

    if (!matched) {
      return {
        success: false,
        error: `No student account found with MoE ID "${moeId}". Please verify your ID or create an account.`,
      };
    }

    if (matched.passwordHash !== password) {
      return {
        success: false,
        error: "Incorrect password. Please try again.",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...profile } = matched;
    setSessionUser(profile);
    return { success: true };
  };

  // Login with Email
  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const accounts = getStoredAccounts();

    const matched = accounts.find(
      (acc) => acc.email.toLowerCase() === trimmedEmail
    );

    if (!matched) {
      return {
        success: false,
        error: `No student account registered with email "${email}".`,
      };
    }

    if (matched.passwordHash !== password) {
      return {
        success: false,
        error: "Incorrect password. Please try again.",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...profile } = matched;
    setSessionUser(profile);
    return { success: true };
  };

  // Register a new Grade 12 student account
  const register = async (
    input: RegisterInput
  ): Promise<{ success: boolean; error?: string }> => {
    const accounts = getStoredAccounts();
    const trimmedMoeId = input.moeId.trim().toUpperCase();
    const trimmedEmail = (input.email || "").trim().toLowerCase();

    // Check duplicate MoE ID
    if (accounts.some((acc) => acc.moeId.toUpperCase() === trimmedMoeId)) {
      return {
        success: false,
        error: `A student account with MoE ID "${input.moeId}" is already registered. Please sign in instead.`,
      };
    }

    // Check duplicate Email if provided
    if (
      trimmedEmail &&
      accounts.some((acc) => acc.email && acc.email.toLowerCase() === trimmedEmail)
    ) {
      return {
        success: false,
        error: `An account with email "${input.email}" already exists.`,
      };
    }

    const newAccount: StoredAccount = {
      id: "std-" + Date.now().toString(),
      fullName: input.fullName.trim(),
      email: trimmedEmail || `${trimmedMoeId.toLowerCase()}@student.moe.gov.et`,
      moeId: trimmedMoeId,
      region: input.region,
      zone: input.zone,
      stream: input.stream as AcademicStream,
      score: input.score ? Number(input.score) : undefined,
      phoneNumber: input.phoneNumber?.trim() || "",
      passwordHash: input.password,
      preferredUniversities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    accounts.push(newAccount);
    saveStoredAccounts(accounts);

    // Automatically log in
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...profile } = newAccount;
    setSessionUser(profile);

    return { success: true };
  };

  // Update profile
  const updateProfile = async (
    updates: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "You must be signed in to update your profile." };
    }

    const accounts = getStoredAccounts();
    const index = accounts.findIndex((acc) => acc.id === user.id);

    if (index === -1) {
      return { success: false, error: "Account could not be found." };
    }

    // Check if new MoE ID or email conflicts with another user
    if (updates.moeId && updates.moeId.toUpperCase() !== user.moeId.toUpperCase()) {
      const conflict = accounts.find(
        (acc) =>
          acc.id !== user.id &&
          acc.moeId.toUpperCase() === updates.moeId!.trim().toUpperCase()
      );
      if (conflict) {
        return { success: false, error: "That MoE ID is already associated with another student account." };
      }
    }

    if (updates.email && updates.email.toLowerCase() !== user.email.toLowerCase()) {
      const conflict = accounts.find(
        (acc) =>
          acc.id !== user.id &&
          acc.email.toLowerCase() === updates.email!.trim().toLowerCase()
      );
      if (conflict) {
        return { success: false, error: "That email is already in use by another student account." };
      }
    }

    const updatedAccount: StoredAccount = {
      ...accounts[index],
      ...updates,
      moeId: updates.moeId ? updates.moeId.trim().toUpperCase() : accounts[index].moeId,
      email: updates.email ? updates.email.trim().toLowerCase() : accounts[index].email,
      updatedAt: new Date().toISOString(),
    };

    accounts[index] = updatedAccount;
    saveStoredAccounts(accounts);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...updatedProfile } = updatedAccount;
    setSessionUser(updatedProfile);

    return { success: true };
  };

  const logout = () => {
    setSessionUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithMoeId,
        loginWithEmail,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
