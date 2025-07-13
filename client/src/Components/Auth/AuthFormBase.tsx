import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";
import { signInWithGoogle } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface AuthFormBaseProps {
  title: string;
  description: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  submitLabel: string;
  switchLabel: string;
  onSwitch: () => void;
  error?: Error | null;
}

export function AuthFormBase({
  title,
  description,
  onSubmit,
  submitLabel,
  switchLabel,
  onSwitch,
  error,
}: AuthFormBaseProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>("");

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (submitLabel === "Register" && password !== confirmPassword) {
      return;
    }
    await onSubmit(email, password);
  };

  const { mutateAsync } = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: ({ data, result }) => {
      localStorage.setItem("token", data.token);
      setUser(result.user);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleGoogleLogin = async () => {
    mutateAsync();
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {submitLabel === "Register" && (
                <div className="grid gap-3">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setValidationError(null);
                    }}
                  />
                </div>
              )}
              {(validationError || error) && (
                <div className="text-red-500 text-xs -mt-4">
                  {validationError || error?.message}
                </div>
              )}
              <Button
                variant="default"
                type="submit"
                className="w-full cursor-pointer"
              >
                {submitLabel}
              </Button>
            </div>
          </form>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mt-4">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleGoogleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              className="underline underline-offset-4 cursor-pointer"
              onClick={onSwitch}
            >
              {switchLabel}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
