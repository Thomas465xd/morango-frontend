export default function ProductDetailsSkeleton() {
    return (
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 animate-pulse">
            <div className="mx-auto max-w-2xl lg:max-w-none">
                {/* Product Section */}
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        {/* Thumbnail Selector */}
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-24 bg-zinc-200 dark:bg-zinc-700 rounded-md"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="relative aspect-square w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full w-24" />
                        </div>

                        {/* Category & Type */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-20" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
                        </div>

                        {/* Product Name */}
                        <div className="h-9 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-4" />

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-40" />
                        </div>

                        {/* Stock Status */}
                        <div className="mt-4">
                            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-32" />
                        </div>

                        {/* Description */}
                        <div className="mt-6 space-y-2">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
                        </div>

                        {/* Tags */}
                        <div className="mt-6 flex gap-2">
                            <div className="h-7 bg-zinc-200 dark:bg-zinc-700 rounded-full w-16" />
                            <div className="h-7 bg-zinc-200 dark:bg-zinc-700 rounded-full w-20" />
                            <div className="h-7 bg-zinc-200 dark:bg-zinc-700 rounded-full w-24" />
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-8">
                            <div className="h-14 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-full" />
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-700 pt-8">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="text-center space-y-2">
                                    <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto" />
                                    <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16 mx-auto" />
                                </div>
                            ))}
                        </div>

                        {/* Specifications */}
                        <div className="mt-8">
                            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-4" />
                            <div className="divide-y divide-zinc-200 dark:divide-zinc-700 border-t border-zinc-200 dark:border-zinc-700">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="py-4 flex items-center justify-between">
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24" />
                                        <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <section className="mt-16 border-t border-zinc-200 dark:border-zinc-700 px-4 py-16 sm:px-0">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-64 mb-8" />

                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                            <div className="flex gap-6 pb-4 items-stretch">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="flex-none" style={{ width: '238px', height: '474px' }}>
                                        <RelatedProductCardSkeleton />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function RelatedProductCardSkeleton() {
    return (
        <div className="h-full flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
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

                {/* Description */}
                <div className="space-y-2">
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