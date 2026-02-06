import { Metadata } from "next";
import Header from "@/components/home/Header";

export const metadata: Metadata = {
    title: "Inicio",
    description: "Bienvenido a Morango Joyas. Explora nuestra colección de joyas exclusivas y accesorios elegantes."
};

export default function Page() {
    return (
        <main className="flex-grow">
            <Header />
        </main>
    )
}
