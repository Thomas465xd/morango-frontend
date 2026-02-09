import Image from "next/image";

export default function About() {
	return (
		<main className="isolate mb-[250px]">
			{/* Hero section */}
			<div className="relative isolate -z-10">
				<svg
					aria-hidden="true"
					className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10"
				>
					<defs>
						<pattern
							x="50%"
							y={-1}
							id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
							width={200}
							height={200}
							patternUnits="userSpaceOnUse"
						>
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<svg
						x="50%"
						y={-1}
						className="overflow-visible fill-gray-50 dark:fill-gray-800"
					>
						<path
							d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
							strokeWidth={0}
						/>
					</svg>
					<rect
						fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
						width="100%"
						height="100%"
						strokeWidth={0}
					/>
				</svg>
				<div
					aria-hidden="true"
					className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
				>
					<div
						style={{
							clipPath:
								"polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
						}}
						className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
					/>
				</div>
				<div className="overflow-hidden">
					<div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
						<div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
							<div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
								<h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
									Pasión en cada joya
								</h1>
								<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none dark:text-gray-400">
									Morango nace de nuestro amor por el color, las texturas y la creación. Cada pieza se diseña y elabora combinando técnicas cuidadosas con líneas contemporáneas que celebran la individualidad de quien la lleva. Nos hace felices ver a nuestros clientes encantados con el colorido y las combinaciones que proponemos; disfrutamos lo que hacemos y lo celebramos en cada pieza, jugando con tonos y texturas para aportar estilo y resaltar tu personalidad única.
								</p>
								<div className="mt-10 space-y-4">
									<div className="flex items-center gap-3">
										<div className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
										<p className="text-sm text-gray-700 dark:text-gray-300">Materiales de la más alta calidad</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
										<p className="text-sm text-gray-700 dark:text-gray-300">Diseños únicos y personalizables</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
										<p className="text-sm text-gray-700 dark:text-gray-300">Certificación y garantía en cada compra</p>
									</div>
								</div>
							</div>
							<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
								<div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
									<div className="relative">
									<Image
										alt="Joya de Oro Blanco"
										src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=687&auto=format&fit=crop"
										width={400}
										height={600}
										className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
									/>
										<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
									</div>
								</div>
								<div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
									<div className="relative">
										<Image
											alt="Anillo de Oro Amarillo"
											src="https://images.unsplash.com/photo-1615655096345-61a54750068d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
											width={400}
											height={600}
											className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
										/>
										<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
									</div>
									<div className="relative">
										<Image
											alt="Joya de Oro Rosado"
											src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600&q=80"
											width={400}
											height={600}
											className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
										/>
										<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
									</div>
								</div>
								<div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
									<div className="relative">
										<Image
											alt="Aros de Plata"
											src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600&q=80"
											width={400}
											height={600}
											className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
										/>
										<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
									</div>
									<div className="relative">
										<Image
											alt="Collar con Piedras"
											src="https://images.unsplash.com/photo-1682823544433-aae34df4e3da?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
											width={400}
											height={600}
											className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
										/>
										<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Image section */}
			<div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                
			<div className="relative aspect-5/2 w-full outline-1 -outline-offset-1 outline-black/5 xl:rounded-3xl dark:outline-white/10 overflow-hidden">
				<Image
					alt="Artesanía de Generaciones - Taller de joyería"
					src="https://images.unsplash.com/photo-1586878341523-7acb55eb8c12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					fill
					sizes="(min-width: 1280px) 1170px, (min-width: 1024px) 960px, 100vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/70 flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-3xl xl:text-4xl font-bold text-white mb-4">Artesanía de Generaciones</h2>
						<p className="text-xl text-amber-50 max-w-2xl">Cada joya Morango representa años de experiencia, dedicación y amor por el arte de la orfebrería</p>
					</div>
				</div>
			</div>
		</div>
			<div className="relative isolate -z-10 mt-32 sm:mt-48">
				<div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden mask-[radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
					<svg
						aria-hidden="true"
						className="h-160 w-7xl flex-none stroke-gray-200 dark:stroke-white/10"
					>
						<defs>
							<pattern
								x="50%"
								y="50%"
								id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
								width={200}
								height={200}
								patternUnits="userSpaceOnUse"
								patternTransform="translate(-100 0)"
							>
								<path d="M.5 200V.5H200" fill="none" />
							</pattern>
						</defs>
						<svg
							x="50%"
							y="50%"
							className="overflow-visible fill-gray-50 dark:fill-gray-800"
						>
							<path
								d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect
							fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
							width="100%"
							height="100%"
							strokeWidth={0}
						/>
					</svg>
				</div>
			</div>
		</main>
	);
}
