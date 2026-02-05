export const runtime = "nodejs";

import AdminSidebar from "@/components/admin/AdminSidebar";
import Footer from "@/components/ui/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        if (!backendUrl) {
            console.error("❌ NEXT_PUBLIC_BACKEND_API_URL is not set");
            return null;
        }

        const url = `${backendUrl}/auth/user`;
        console.log("🔄 Fetching user from:", url);

        const res = await fetch(url, {
            headers: {
                Cookie: cookieStore.getAll()
                    .map(c => `${c.name}=${c.value}`)
                    .join("; "),
                "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
            signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!res.ok) {
            console.error(`❌ Failed to fetch user: ${res.status} ${res.statusText}`);
            return null;
        }

        // Prevent JSON parse crash
        const text = await res.text();
        if (!text) {
            console.warn("⚠️ Empty response from backend");
            return null;
        }

        const user = JSON.parse(text);
        console.log("✅ User fetched successfully:", user.email, "Role:", user.role);
        return user;
    } catch (error) {
        console.error("❌ Error fetching user:", error instanceof Error ? error.message : error);
        return null;
    }
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
