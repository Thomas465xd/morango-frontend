export default function UserPaymentDetailsSkeleton() {
    return (
        <main className="mx-auto max-w-4xl pt-8 pb-24 px-4 sm:px-6 lg:px-8 animate-pulse">
            {/* Header with Back Button */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                    <div className="h-4 w-64 bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>
                <div className="h-10 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
            </div>

            {/* Status Overview Card */}
            <div className="bg-zinc-100 dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-lg p-6 mb-8">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-600 rounded" />
                        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>
                    <div className="text-right space-y-2">
                        <div className="h-4 w-20 bg-zinc-100 dark:bg-zinc-700 rounded" />
                        <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-600 rounded" />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Order Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Help Section */}
            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-3" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-700 rounded" />
                    <div className="h-4 w-5/6 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    <div className="h-3 w-40 bg-zinc-100 dark:bg-zinc-700 rounded mt-4" />
                </div>
            </div>
        </main>
    );
}
