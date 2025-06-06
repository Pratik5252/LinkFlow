import { AuthFormBase } from "./AuthFormBase";
import { register } from "@/services/auth";
import { useState } from "react";

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (email: string, password: string) => {
    try {
      const res = await register({ email, password });
      console.log(res);

      if (res.user) {
        setError(null);
        // Optionally auto-login or redirect
      } else {
        setError(res.message || "Registration Failed");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <AuthFormBase
      title="Create an account"
      description="Enter your email below to create your account"
      onSubmit={handleRegister}
      submitLabel="Register"
      switchLabel="Already have an account? Login"
      onSwitch={onSwitch}
      error={error}
    />
  );
}
