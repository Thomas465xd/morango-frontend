"use client";

import Tabs from "@/components/ui/Tabs";
import { profileTabs } from "@/src/types";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const router = useRouter();
    const { user, isLoading, isError } = useAuth();

    useEffect(() => {
        if (isLoading) return; // Still checking auth

        // Not authenticated or error
        if (!user) {
            router.push("/auth/login");
            return;
        }
    }, [user, isLoading, isError, router]);

    // Show nothing while loading or redirecting
    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-stone-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-zinc-600 dark:text-zinc-300">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-8">
            <Tabs
                tabs={profileTabs}
            />

            {children}
        </div>
    );
}