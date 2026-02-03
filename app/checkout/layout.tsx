import CheckoutNavBar from "@/components/checkout/CheckoutNavBar";
import Footer from "@/components/ui/Footer";
import { ReactNode } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div
            className="
                min-h-screen 
                bg-gradient-to-br bg-zinc-100/90
                dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-950
            "
        >
            <CheckoutNavBar />


            <main className="">
                {children}
            </main>

            <Footer auth />
        </div>
    );
}