"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import Footer from "@/components/ui/Footer";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

export default function AdminLayout({
	children,
} : {
	children: ReactNode;
}) {
    const router = useRouter();
    const { user, isLoading, isError } = useAuth();

    useEffect(() => {
        if (isLoading) return; // Still checking auth

        // Not authenticated or error
        if (!user) {
            router.push("/auth/login");
            return;
        }

        // Not admin
        if (user.role !== "admin") {
            router.push("/404");
            return;
        }
    }, [user, isLoading, isError, router]);

    // Show nothing while loading or redirecting
    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-zinc-100/90 dark:from-stone-900 dark:via-stone-800 dark:to-stone-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-zinc-600 dark:text-zinc-300">Verificando permiso de administrador...</p>
                </div>
            </div>
        );
    }

	return (
		<div className="min-h-screen 
            bg-gradient-to-br bg-zinc-100/90
            dark:from-stone-900 dark:via-stone-800 dark:to-stone-950"
        >
			<AdminSidebar />

			<div className="flex min-h-screen flex-col lg:pl-72">
				<main className="flex-1">
                    {children}
                </main>

				<Footer auth />
			</div>
		</div>
	);
}
