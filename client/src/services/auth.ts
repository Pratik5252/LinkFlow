export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  error?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    email: string;
    id: string;
  };
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}
