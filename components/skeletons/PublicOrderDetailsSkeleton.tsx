export default function PublicOrderDetailsSkeleton() {
    return (
        <main className="mx-auto max-w-2xl pt-8 pb-24 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8 animate-pulse">
            {/* Header */}
            <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                    {/* Tracking Number */}
                    <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    {/* Status Badge */}
                    <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mt-2 sm:mt-0" />
                </div>
                {/* Creation Date */}
                <div className="h-4 w-56 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>

            {/* Products Section */}
            <section className="mt-8 px-4 sm:px-0">
                {/* Product Item 1 */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                            {/* Quantity Badge */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded-lg" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                            {/* Product Name */}
                            <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            {/* Quantity */}
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-3" />
                            {/* Prices */}
                            <div className="space-y-1">
                                <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Item 2 */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 sm:p-6">
                    <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                            {/* Quantity Badge */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded-lg" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                            {/* Product Name */}
                            <div className="h-5 w-56 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            {/* Quantity */}
                            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-700 rounded mb-3" />
                            {/* Prices */}
                            <div className="space-y-1">
                                <div className="h-4 w-44 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                <div className="h-6 w-36 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Bar Section */}
            <div className="mt-8 px-4 sm:px-0">
                <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    {/* Progress Bar */}
                    <div className="space-y-4">
                        <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
                        </div>

                        {/* Progress Steps */}
                        <div className="grid grid-cols-4 gap-2">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>

                    {/* Optional delivered info */}
                    <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    </div>
                </div>
            </div>

            {/* Order Details Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 px-4 sm:px-0">
                {/* Shipping Address & Method */}
                <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    {/* Shipping Address */}
                    <div className="border-b-2 border-zinc-300 dark:border-zinc-600 pb-4 mb-4">
                        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-3" />
                        <div className="space-y-2">
                            <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>

                    {/* Shipping Method */}
                    <div>
                        <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-3" />
                        <div className="space-y-2">
                            <div className="h-4 w-44 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />

                    <dl className="space-y-3">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Shipping */}
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </dl>
                </div>
            </section>

            {/* Account Suggestion Section */}
            <section className="mt-10 mx-4 sm:mx-0 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />

                    <div className="flex-1">
                        {/* Title */}
                        <div className="h-5 w-56 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex gap-3">
                        <div className="h-10 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                        <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                    </div>
                </div>
            </section>
        </main>
    );
}
