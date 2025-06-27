import { AuthFormBase } from "./AuthFormBase";
import { register } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const { mutateAsync, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = async (email: string, password: string) => {
    mutateAsync({ email, password });
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
