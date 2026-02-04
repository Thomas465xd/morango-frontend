import { faqs } from "@/src/types";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

export default function Questions() {
	// Group FAQs by category
	const groupedFaqs = faqs.reduce(
		(acc, faq) => {
			const existing = acc.find((group) => group.category === faq.category);
			if (existing) {
				existing.items.push(faq);
			} else {
				acc.push({ category: faq.category, items: [faq] });
			}
			return acc;
		},
		[] as Array<{ category: string; items: typeof faqs }>
	);

	return (
		<div className="bg-white dark:bg-zinc-900">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl">
					<h2 className="heading text-4xl uppercase">
						Preguntas Frecuentes
					</h2>

					{/* Loop through categories */}
					{groupedFaqs.map((group) => (
						<div key={group.category} className="mt-16">
							{/* Category Title */}
							<h3 className="text-2xl font-semibold text-zinc-900 dark:text-orange-100 mb-8 pb-4 border-b-2 border-orange-300 dark:border-orange-200/30">
								{group.category}
							</h3>

							{/* FAQ Items for this category */}
							<dl className="divide-y divide-zinc-900/10 dark:divide-white/10">
								{group.items.map((faq, index) => (
									<Disclosure
										key={`${group.category}-${index}`}
										as="div"
										className="py-6 first:pt-0 last:pb-0"
									>
										<dt>
											<DisclosureButton className="group flex w-full items-start justify-between text-left text-zinc-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200">
												<span className="text-base/7 font-semibold pr-4">
													{faq.question}
												</span>
												<span className="ml-6 flex h-7 items-center flex-shrink-0">
													<Plus
														aria-hidden="true"
														className="size-6 group-data-open:hidden text-orange-600 dark:text-orange-400"
													/>
													<Minus
														aria-hidden="true"
														className="size-6 group-not-data-open:hidden text-orange-600 dark:text-orange-400"
													/>
												</span>
											</DisclosureButton>
										</dt>
										<DisclosurePanel as="dd" className="mt-4 pr-12">
											<p className="text-base/7 text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
												{faq.answer}
											</p>
										</DisclosurePanel>
									</Disclosure>
								))}
							</dl>
						</div>
					))}

					{/* Contact CTA */}
					<div className="mt-20 p-8 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 border-2 border-orange-200 dark:border-orange-800 rounded-lg">
						<h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
							¿No encontraste lo que buscas?
						</h3>
						<p className="text-orange-800 dark:text-orange-200 mb-4">
							Estamos aquí para ayudarte. Contacta con nosotros directamente:
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href="/home/contact"
								className="button-orange-gradient flex-center text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
							>
								Formulario de Contacto
							</a>
							<a
								href="https://instagram.com/morangojoyas.cl"
								target="_blank"
								rel="noopener noreferrer"
								className="button flex-center border-orange-300 dark:border-orange-400 text-orange-600 dark:text-orange-300 font-semibold px-6 py-3 rounded-lg transition-all duration-200"
							>
								@morangojoyas.cl
							</a>
							<a
								href="mailto:contacto@morangojoyas.cl"
								className="button flex-center border-orange-300 dark:border-orange-400 text-orange-600 dark:text-orange-300 font-semibold px-6 py-3 rounded-lg transition-all duration-200"
							>
								contacto@morangojoyas.cl
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
