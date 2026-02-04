export default function ProductsViewSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Search and Filters Section */}
            <div className="pb-8 border-b border-zinc-200 dark:border-zinc-700">
                <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md w-full" />

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md w-32" />
                        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md w-40" />
                        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md w-36" />
                        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md w-24" />
                    </div>
                </div>
            </div>

            {/* Total Products & Filters Button */}
            <div className="flex-between mt-4">
                <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-32" />
                <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-20" />
            </div>

            {/* Products Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>

            {/* Pagination Section */}
            <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-700 mt-8">
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-40" />
                    <div className="flex gap-2">
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
            {/* Image Skeleton */}
            <div className="relative w-full aspect-square bg-zinc-200 dark:bg-zinc-700" />

            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-4 space-y-3">
                {/* Category/Type */}
                <div className="flex items-center gap-2">
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-12" />
                </div>

                {/* Title */}
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />

                {/* Description - Hidden on mobile */}
                <div className="hidden sm:block space-y-2">
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
                </div>

                {/* Attributes/Tags */}
                <div className="flex gap-2">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-20" />
                </div>

                {/* Price Section */}
                <div className="flex flex-1 flex-col justify-end pt-2 space-y-2">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-24" />
                </div>
            </div>
        </div>
    );
}