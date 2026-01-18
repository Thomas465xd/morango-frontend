export default function AdminTableSkeleton() {
	return (
		<div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 mt-12 animate-pulse">
			{/* Search and Filters bar skeleton */}
			<div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700">
				<div className="space-y-4">
					{/* Search input skeleton */}
					<div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md"></div>

					{/* Filter controls skeleton */}
					<div className="flex flex-wrap gap-3 items-center">
						{/* Checkbox skeleton */}
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
							<div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
						</div>

						{/* Product type button skeleton */}
						<div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-md"></div>

						{/* Tags input skeleton */}
						<div className="flex items-center gap-2">
							<div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-700 rounded-md"></div>
							<div className="h-8 w-8 bg-orange-200 dark:bg-orange-300 rounded-md"></div>
						</div>
					</div>
				</div>
			</div>

			{/* Table skeleton */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-gradient-to-r from-zinc-800 to-zinc-700">
							<th className="w-8 px-2 py-4">
								<div className="h-4 w-4 bg-zinc-600 rounded mx-auto"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-24 bg-zinc-600 rounded"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-16 bg-zinc-600 rounded"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-24 bg-zinc-600 rounded"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-20 bg-zinc-600 rounded"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-16 bg-zinc-600 rounded"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-20 bg-zinc-600 rounded"></div>
							</th>
							<th className="px-6 py-4">
								<div className="h-4 w-24 bg-zinc-600 rounded"></div>
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-800">
						{/* Generate 5 skeleton rows */}
						{[...Array(5)].map((_, index) => (
							<tr
								key={index}
								className="hover:bg-zinc-50 dark:hover:bg-zinc-700"
							>
								{/* Expand button column */}
								<td className="px-3 py-4 text-center">
									<div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto"></div>
								</td>

								{/* Product name column */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
										<div className="h-3 w-3 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
									</div>
								</td>

								{/* Product type column */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
										<div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
									</div>
								</td>

								{/* Category column */}
								<td className="px-6 py-4">
									<div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
								</td>

								{/* Price column */}
								<td className="px-6 py-4">
									<div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
								</td>

								{/* Stock column */}
								<td className="px-6 py-4">
									<div className="h-4 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
								</td>

								{/* Status column */}
								<td className="px-6 py-4">
									<div className="h-6 w-16 bg-orange-100 dark:bg-orange-200 rounded"></div>
								</td>

								{/* Actions column */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
										<div className="h-4 w-14 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
										<div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Table footer skeleton */}
			<div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
				<div className="flex items-center justify-between">
					<div className="h-3 w-48 bg-zinc-200 dark:bg-zinc-700 rounded"></div>

					{/* Pagination skeleton */}
					<div className="flex items-center gap-2">
						<div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
						<div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
						<div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
