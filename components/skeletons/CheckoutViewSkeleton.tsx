export default function CheckoutViewSkeleton() {
    return (
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
            {/* Title Skeleton */}
            <div className="h-9 w-64 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-8" />

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                {/* Left Column - Form Skeleton */}
                <div className="lg:col-span-7">
                    <div className="space-y-8">
                        {/* Contact Section */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-6 w-24 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                <div className="h-4 w-28 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                            </div>

                            <div className="space-y-3">
                                <div className="h-12 w-full bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                    <div className="h-4 w-72 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                </div>
                            </div>
                        </section>

                        {/* Delivery Method Section */}
                        <section>
                            <div className="h-6 w-40 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-4" />
                            
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="h-16 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                <div className="h-16 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                            </div>
                        </section>

                        {/* Delivery Information Section */}
                        <section>
                            <div className="h-6 w-48 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-4" />

                            <div className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                    <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                </div>

                                {/* City Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                    <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                </div>

                                {/* Address */}
                                <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

                                {/* Reference */}
                                <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

                                {/* Postal and Phone */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                    <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                                </div>

                                {/* Region */}
                                <div className="h-12 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                            </div>
                        </section>

                        {/* Shipping Methods Section */}
                        <section>
                            <div className="h-6 w-36 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-4" />

                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div 
                                        key={i}
                                        className="h-20 bg-stone-200 dark:bg-zinc-800 rounded-lg animate-pulse"
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Confirm Button Skeleton */}
                        <div className="h-14 w-full bg-stone-300 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Right Column - Order Summary Skeleton */}
                <div className="lg:col-span-5 mt-10 lg:mt-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Free Shipping Alert */}
                        <div className="h-24 bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-pulse" />

                        {/* Order Summary Card */}
                        <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                            <div className="h-6 w-40 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-4" />

                            {/* Order Items */}
                            <div className="space-y-4 mb-6">
                                {[1].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-16 h-16 bg-stone-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-3/4 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                            <div className="h-3 w-1/2 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                        </div>
                                        <div className="h-4 w-20 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-stone-200 dark:border-stone-700 pt-4">
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-16 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                </div>
                                <div className="flex justify-between border-t border-stone-200 dark:border-stone-700 pt-3">
                                    <div className="h-5 w-16 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                    <div className="h-5 w-28 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                                <div className="h-4 w-48 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                            <div className="h-6 w-24 bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-4" />
                            <div className="h-4 w-full bg-stone-300 dark:bg-zinc-700 rounded animate-pulse mb-4" />
                            <div className="h-14 w-full bg-stone-300 dark:bg-zinc-700 rounded-lg animate-pulse" />
                            
                            {/* Warning Alert */}
                            <div className="mt-3 h-16 bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-pulse" />

                            {/* Trust Elements */}
                            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-4 w-full bg-stone-300 dark:bg-zinc-700 rounded animate-pulse" />
                                ))}
                            </div>
                        </div>

                        {/* Why Buy Section */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                            <div className="h-5 w-48 bg-orange-300 dark:bg-orange-700 rounded animate-pulse mb-3" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-4 w-full bg-orange-200 dark:bg-orange-800 rounded animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}