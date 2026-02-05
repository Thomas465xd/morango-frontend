export const runtime = "nodejs";

import AdminSidebar from "@/components/admin/AdminSidebar";
import Footer from "@/components/ui/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

async function getCurrentUser() {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/user`,
        {
            headers: {
                Cookie: cookieStore.getAll()
                    .map(c => `${c.name}=${c.value}`)
                    .join("; "),
            },
            credentials: "include",
            cache: "no-store",
        }
    );

    if (!res.ok) return null;

    // Prevent JSON parse crash
    const text = await res.text();
    if (!text) return null;

    return JSON.parse(text);
}

export default async function AdminLayout({
	children,
} : {
	children: ReactNode;
}) {
    const user = await getCurrentUser();

    if (!user) redirect("/auth/login");

    if (user.role !== "admin") redirect("/unauthorized");

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
