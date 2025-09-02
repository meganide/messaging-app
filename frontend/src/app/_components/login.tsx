"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../_hooks/use-login";

export function Login() {
  const { login, loginMutation } = useLogin();

  return (
    <form onSubmit={login} className="flex flex-col gap-4 max-w-md w-xs">
        <h2 className="text-2xl font-bold">Login</h2>
        <Input placeholder="Email" name="email" type="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
    </form>
  )
}
