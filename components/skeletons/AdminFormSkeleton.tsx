export default function AdminFormSkeleton() {
	return (
		<div className="mt-8 animate-pulse">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column - Form Sections */}
				<div className="lg:col-span-2 space-y-6">
					{/* Información Básica Section */}
					<div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
						{/* Section Header */}
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
							<div className="h-6 w-40 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
						</div>

						{/* Product Name */}
						<div className="mb-6">
							<div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
							<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
						</div>

						{/* Product Type and Category */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
							<div>
								<div className="h-4 w-28 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
							<div>
								<div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
						</div>

						{/* Description */}
						<div>
							<div className="h-4 w-28 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
							<div className="h-32 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
						</div>
					</div>

					{/* Precio y Stock Section */}
					<div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
						{/* Section Header */}
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
							<div className="h-6 w-32 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
						</div>

						{/* Price and Stock */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
							<div>
								<div className="h-4 w-36 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
							<div>
								<div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
						</div>

						{/* Active Checkbox */}
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
							<div className="h-4 w-56 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
						</div>
					</div>

					{/* Características Section */}
					<div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
						{/* Section Header */}
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
							<div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
						</div>

						{/* Attributes Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
							<div>
								<div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<div className="h-4 w-28 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
							<div>
								<div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-600 rounded mb-2"></div>
								<div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							</div>
						</div>
					</div>

					{/* Etiquetas Section */}
					<div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
						{/* Section Header */}
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
							<div className="h-6 w-40 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
						</div>

						{/* Tags Input Area */}
						<div className="flex items-center gap-3">
							<div className="flex-1 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							<div className="w-24 h-12 bg-orange-200 dark:bg-orange-300 rounded-lg"></div>
						</div>
					</div>
				</div>

				{/* Right Column - Images and Summary */}
				<div className="space-y-6">
					{/* Imágenes del Producto Section */}
					<div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
						{/* Section Header */}
						<div className="flex items-center gap-3 mb-3">
							<div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
							<div className="h-6 w-44 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
						</div>

						{/* Subtitle */}
						<div className="h-3 w-full bg-zinc-200 dark:bg-zinc-700 rounded mb-4"></div>

						{/* Upload Area */}
						<div className="h-32 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600 mb-4 flex items-center justify-center">
							<div className="text-center">
								<div className="w-12 h-12 bg-zinc-300 dark:bg-zinc-600 rounded-full mx-auto mb-2"></div>
								<div className="h-3 w-40 bg-zinc-300 dark:bg-zinc-600 rounded mx-auto"></div>
							</div>
						</div>

						{/* Image Thumbnails */}
						<div className="grid grid-cols-2 gap-3">
							<div className="aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							<div className="aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
							<div className="aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
						</div>
					</div>

					{/* Resumen Section */}
					<div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
						{/* Section Header */}
						<div className="h-6 w-24 bg-zinc-300 dark:bg-zinc-600 rounded mb-4"></div>

						{/* Summary Items */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
								<div className="h-4 w-12 bg-orange-200 dark:bg-orange-300 rounded"></div>
							</div>
							<div className="flex items-center justify-between">
								<div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
								<div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
							</div>
							<div className="flex items-center justify-between">
								<div className="h-4 w-14 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
								<div className="h-4 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Submit Buttons */}
			<div className="mt-6 flex items-center justify-end gap-3">
				<div className="h-12 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
				<div className="h-12 w-40 bg-orange-200 dark:bg-orange-300 rounded-lg"></div>
			</div>
		</div>
	);
}
