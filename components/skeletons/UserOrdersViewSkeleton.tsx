import React from 'react'

export default function UserOrdersViewSkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-pulse my-8">
            {/* Header Skeleton */}
            <div>
                <div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-64 bg-zinc-100 dark:bg-zinc-800 rounded mt-4" />
            </div>

            {/* Search and Filters Skeleton */}
            <div className="space-y-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                <div className="flex gap-3">
                    <div className="h-8 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    <div className="h-8 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
                </div>
            </div>

            {/* Order Cards Skeleton */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                    >
                        {/* Card Header */}
                        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-700/30 border-b border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-600 rounded" />
                                    <div className="flex gap-4">
                                        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                        <div className="h-4 w-28 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 space-y-2">
                                    <div className="h-4 w-16 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                    <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-600 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="px-6 py-4 space-y-4">
                            {/* Product Preview */}
                            <div>
                                <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-700 rounded mb-3" />
                                <div className="flex gap-3">
                                    {[1, 2, 3].map((j) => (
                                        <div
                                            key={j}
                                            className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex-shrink-0"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="space-y-2">
                                        <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                        <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-700/30 border-t border-zinc-200 dark:border-zinc-700 flex justify-end">
                            <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-600 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
