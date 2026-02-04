export default function AdminPaymentDetailsSkeleton() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
            {/* Header Card - Status Overview */}
            <div className="bg-zinc-200 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-600 rounded-lg p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded" />
                            <div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-600 rounded" />
                        </div>
                        <div className="h-4 w-40 bg-zinc-300 dark:bg-zinc-600 rounded mt-2" />
                    </div>
                    <div className="text-right">
                        <div className="h-8 w-32 bg-zinc-300 dark:bg-zinc-600 rounded mb-2" />
                        <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-600 rounded" />
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Order Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    </div>

                    <div className="space-y-3">
                        {/* Tracking Number */}
                        <div>
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>

                        {/* Order Total */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Order Status */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Customer Info */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-3 w-56 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>
                </div>

                {/* Right Column - Payment Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    </div>

                    <div className="space-y-3">
                        {/* Payment ID */}
                        <div>
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>

                        {/* Preference ID */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Provider */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Timestamps */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rejection Reason Skeleton (conditional) */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-300 dark:bg-red-700 rounded flex-shrink-0" />
                    <div className="flex-1">
                        <div className="h-4 w-32 bg-red-300 dark:bg-red-700 rounded mb-2" />
                        <div className="h-3 w-full bg-red-200 dark:bg-red-800 rounded" />
                    </div>
                </div>
            </div>

            {/* MercadoPago Metadata Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
                </div>

                {/* Transaction Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cardholder Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Details */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fee Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded">
                                <div className="flex justify-between mb-2">
                                    <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-600 rounded" />
                                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-600 rounded" />
                                </div>
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-600 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
