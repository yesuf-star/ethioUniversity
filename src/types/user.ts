export type AcademicStream = "natural" | "social";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  moeId: string; // Ministry of Education ID card / admission number
  region: string;
  zone: string;
  stream: AcademicStream;
  score?: number;
  phoneNumber?: string;
  avatarUrl?: string; // Custom uploaded profile photo or avatar
  preferredUniversities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RegisterInput {
  fullName: string;
  email?: string;
  moeId: string;
  password: string;
  region: string;
  zone: string;
  stream: AcademicStream;
  score?: number;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface LoginMoeInput {
  moeId: string;
  password: string;
}

export interface LoginEmailInput {
  email: string;
  password: string;
}
