import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    email: string;
    id: string;
  };
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    email: string;
    id: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    return res.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Include cookies
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return res.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  try {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Include cookies
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();

    return { data, result };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};

export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Logout failed");
    }
    await signOut(auth);

    return res.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
}

export async function deleteUserAccount(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/user`, {
      method: "DELETE",
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete account");
    }

    return res.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
}
