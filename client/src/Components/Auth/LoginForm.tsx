// src/Components/Auth/LoginForm.tsx
import { AuthFormBase } from "./AuthFormBase";
import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();

  const { mutateAsync, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = async (email: string, password: string) => {
    mutateAsync({ email, password });
  };

  return (
    <AuthFormBase
      title="Login to your account"
      description="Enter your email below to login to your account"
      onSubmit={handleLogin}
      submitLabel="Login"
      switchLabel="Don't have an account? Sign up"
      onSwitch={onSwitch}
      error={error}
    />
  );
}

