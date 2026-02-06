"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle, HelpCircle, Mail } from "lucide-react";
import { collections, headerCategories } from "@/src/types";

export default function Header() {
	return (
		<div className="bg-white dark:bg-zinc-900">
			{/* Hero Section */}
			<div className="relative bg-zinc-900 overflow-hidden">
				{/* Background Image Placeholder */}
				<div aria-hidden="true" className="absolute inset-0">
					<Image
						alt="Hero background"
						src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&h=1080&fit=crop"
						fill
						sizes="100vh"
						fetchPriority="high"
					/>
				</div>

				{/* Orange Overlay */}
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-gradient-to-r from-orange-200/40 to-orange-300/30"
				/>

				{/* Hero Content */}
				<div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center sm:pt-36 sm:pb-48 lg:px-8">
					<div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
						<Sparkles size={18} className="text-orange-500" />
						<span className="text-sm font-semibold text-white">
							Joyería Premium
						</span>
					</div>

					<h1 
                        className="
                            text-4xl sm:text-5xl lg:text-6xl 
                            font-bold tracking-widest uppercase 
                            text-white mb-4 drop-shadow-lg
                        "
                    >
						Explora nuestra Colección
					</h1>

					<p className="mt-6 text-lg sm:text-xl text-orange-100 drop-shadow max-w-2xl leading-relaxed">
						Diseños exclusivos y elegantes confeccionados con los materiales más finos. Cada pieza cuenta una historia de sofisticación y belleza.
					</p>

					<Link
						href="/home/products?sale=true"
						className="
                            mt-10 flex-align 
                            button 
                            px-8 py-4 rounded-lg 
                            text-white font-semibold 
                            hover:text-white hover:border-white
                            transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform
                        "
					>
						Ver Colección Completa
						<ArrowRight size={20} />
					</Link>
				</div>

				{/* Bottom Gradient */}
				<div className="absolute bottom-0 left-0 right-0 h-42 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
			</div>

			<main>
				{/* Category Section */}
				<section
					aria-labelledby="category-heading"
					className="pt-20 sm:pt-32 pb-12"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
							<div>
								<h2
									id="category-heading"
									className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-orange-100"
								>
									Compra por Tipo
								</h2>
								<p className="mt-2 text-zinc-600 dark:text-zinc-400">
									Encuentra exactamente lo que buscas entre nuestras categorías
								</p>
							</div>
							<Link
								href="/home/products"
								className="link flex-align text-lg"
							>
								Ver todos
								<ArrowRight size={18} />
							</Link>
						</div>

						{/* Category Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
							{headerCategories.map((category) => (
								<Link
									key={category.name}
									href={category.href}
									className="group relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
								>
									{/* Image */}
									<Image
										alt={category.name}
										src={category.imageSrc}
										fill
									    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                                    />

									{/* Content */}
									<div className="absolute inset-0 flex flex-col items-center justify-end p-4">
										<h3 className="text-xl sm:text-2xl font-bold text-white text-center group-hover:text-orange-200 transition-colors">
											{category.name}
										</h3>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* Featured Collection Section */}
				<section
					aria-labelledby="featured-heading"
					className="py-12 sm:py-20 bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-zinc-800/50 dark:to-zinc-800/30"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2
								id="featured-heading"
								className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-orange-100"
							>
								Colecciones Destacadas
							</h2>
							<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
								Explora nuestras selecciones exclusivas para cada ocasión
							</p>
						</div>

						{/* Collections Grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{collections.map((collection) => (
								<Link
									key={collection.name}
									href={collection.href}
									className="group"
								>
									{/* Image Container */}
									<div className="relative h-80 sm:h-96 rounded-lg overflow-hidden shadow-lg mb-4">
										<Image
											alt={collection.imageAlt}
											src={collection.imageSrc}
											fill										sizes="(min-width: 1024px) 33vw, 100vw"											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
									</div>

									{/* Content */}
									<div>
										<h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-orange-100 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
											{collection.name}
										</h3>
										<p className="mt-2 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors leading-relaxed">
											{collection.description}
										</p>
										<div className="mt-4 inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-3 transition-all">
											Explorar
											<ArrowRight size={18} />
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 sm:py-24 bg-zinc-900 dark:bg-zinc-950/50 overflow-hidden">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
							Encuentra tu Joya Perfecta
						</h2>
						<p className="text-lg text-amber-100 mb-8 leading-relaxed">
							Cada pieza de nuestra colección está cuidadosamente seleccionada y confeccionada con atención al detalle. Descubre la belleza y la elegancia en cada diseño.
						</p>
						<Link
							href="/home/products"
							className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-orange-300 hover:bg-orange-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
						>
							Explorar Ahora
							<ArrowRight size={20} />
						</Link>
					</div>
				</section>

				{/* Still Have Doubts Section */}
				<section className="py-16 sm:py-20 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800/50">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-orange-100 mb-4">
								¿Aún tienes dudas?
							</h2>
							<p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
								Estamos aquí para ayudarte. Consulta nuestras preguntas frecuentes o ponte en contacto directo con nuestro equipo.
							</p>

							{/* Action Links */}
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link
									href="/home/questions"
									className="flex-center w-full md:w-auto gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
								>
									<Sparkles size={18} />
									Ver Preguntas Frecuentes
								</Link>

								<Link
									href="/home/contact"
									className="flex-center w-full md:w-auto gap-2 px-6 py-3 rounded-lg border-2 border-orange-500 hover:border-orange-600 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-all duration-300 hover:bg-orange-50 dark:hover:bg-orange-900/10"
								>
									<Mail size={18} />
									Contactanos Aquí
								</Link>
							</div>

							{/* Trust indicators */}
							<div className="mt-12 flex-center flex-col md:flex-row gap-6">
								<div className="text-center p-4">
									<div className="flex justify-center mb-3">
										<CheckCircle size={32} className="text-green-600 dark:text-green-400" />
									</div>
									<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
										Respuesta Rápida
									</h3>
									<p className="text-xs text-zinc-600 dark:text-zinc-400">
										Nos contactaremos en menos de 24 horas
									</p>
								</div>

								<div className="text-center p-4">
									<div className="flex justify-center mb-3">
										<HelpCircle size={32} className="text-orange-600 dark:text-orange-400" />
									</div>
									<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
										Centro de Ayuda
									</h3>
									<p className="text-xs text-zinc-600 dark:text-zinc-400">
										Encuentra respuestas en nuestra sección FAQ
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}