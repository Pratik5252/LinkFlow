import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import type { ToasterProps } from "sonner";
import { Toaster } from "@/Components/ui/sonner";
import { useTheme } from "next-themes";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { resolvedTheme } = useTheme();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Toaster richColors theme={resolvedTheme as ToasterProps["theme"]} />
      <div className="w-full max-w-sm">
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
