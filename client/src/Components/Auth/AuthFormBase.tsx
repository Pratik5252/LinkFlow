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

interface AuthFormBaseProps {
  title: string;
  description: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  submitLabel: string;
  switchLabel: string;
  onSwitch: () => void;
  error?: string | null;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
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
              {error && <div className="text-red-500 text-xs">{error}</div>}
              <Button variant="default" type="submit" className="w-full cursor-pointer">
                {submitLabel}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <button
                type="button"
                className="underline underline-offset-4 cursor-pointer"
                onClick={onSwitch}
              >
                {switchLabel}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
