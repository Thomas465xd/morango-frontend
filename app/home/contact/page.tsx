import ContactForm from "@/components/home/contact/ContactForm";
import ContactInformation from "@/components/home/contact/ContactInformation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto",
    description: "Contáctanos para consultas, sugerencias o cualquier duda sobre nuestros productos y servicios."
}

export default function page() {
    return (
		<section className="py-16 bg-zinc-50 dark:bg-zinc-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <ContactInformation />
                    <ContactForm />
				</div>
			</div>
		</section>
    )
}