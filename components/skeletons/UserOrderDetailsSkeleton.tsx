export default function UserOrderDetailsSkeleton() {
    return (
        <main className="mx-auto max-w-7xl pt-8 pb-24 px-4 sm:px-6 lg:px-8 animate-pulse">
            {/* Header */}
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                    <div className="h-10 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>
                <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>

            {/* Main Grid */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Progress Bar */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full mb-4" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-4 bg-zinc-100 dark:bg-zinc-700 rounded" />
                            ))}
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                        <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-700 rounded mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                    <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Shipping Method */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <div className="h-6 w-36 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                        <div className="space-y-3">
                            <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
                            <div className="h-3 w-40 bg-zinc-100 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between">
                                    <div className="h-4 w-20 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                    <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Info */}
                    <div className="bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-600 rounded mb-4" />
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="space-y-1">
                                    <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                    <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
