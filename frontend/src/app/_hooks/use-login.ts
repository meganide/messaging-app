"use client"

import { useTRPC } from "@/lib/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useLogin() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const loginMutation = useMutation(trpc.auth.login.mutationOptions({
        onSuccess() {
            queryClient.invalidateQueries(trpc.auth.me.queryOptions());
        },
    }))

    const login = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        loginMutation.mutate({ email, password });
    }, [loginMutation]);

    return { login, loginMutation };
}