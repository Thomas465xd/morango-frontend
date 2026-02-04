import Tabs from "@/components/ui/Tabs";
import { profileTabs } from "@/src/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

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


export default async function ProfileLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    const user = await getCurrentUser();

    if (!user) redirect("/auth/login");

    return (
        <div className="p-3 sm:p-8">
            <Tabs
                tabs={profileTabs}
            />

            {children}
        </div>
    );
}