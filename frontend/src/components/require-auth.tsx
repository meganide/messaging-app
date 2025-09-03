"use client";

import { useAuth } from "@/hooks/use-auth";
import { Login } from "@/app/_components/login";
import { Loader2 } from "lucide-react";

type RequireAuthProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RequireAuth({ children, fallback }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!isAuthenticated) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        {fallback || <Login />}
      </section>
    );
  }

  return children;
}
