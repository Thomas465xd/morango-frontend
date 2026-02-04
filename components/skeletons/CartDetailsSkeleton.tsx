export default function CartDetailsSkeleton() {
    return (
        <main className="mx-auto w-full max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8 animate-pulse">
            {/* Title */}
            <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />

            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                {/* Products List */}
                <section className="lg:col-span-7">
                    {/* Products Table Header Border */}
                    <div className="border-t border-b border-zinc-200 dark:border-zinc-700">
                        {/* Product Item 1 */}
                        <div className="flex py-6 sm:py-8 border-b border-zinc-200 dark:border-zinc-700">
                            {/* Product Image */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />

                            {/* Product Info */}
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                <div className="relative">
                                    {/* Header with Remove Button */}
                                    <div className="flex justify-between">
                                        <div className="flex-1 min-w-0 pr-8">
                                            {/* Product Name */}
                                            <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />

                                            {/* Product Type & Attribute */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                                <span className="text-zinc-300 dark:text-zinc-600">•</span>
                                                <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                            </div>

                                            {/* Price */}
                                            <div className="space-y-1">
                                                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="absolute top-0 right-0 w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                    </div>

                                    {/* Stock Status & Quantity Controls */}
                                    <div className="mt-4 flex items-center justify-between">
                                        {/* Stock Status */}
                                        <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-600 rounded-md">
                                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                            <div className="w-12 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Item 2 */}
                        <div className="flex py-6 sm:py-8 border-b border-zinc-200 dark:border-zinc-700">
                            {/* Product Image */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />

                            {/* Product Info */}
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                <div className="relative">
                                    {/* Header with Remove Button */}
                                    <div className="flex justify-between">
                                        <div className="flex-1 min-w-0 pr-8">
                                            {/* Product Name */}
                                            <div className="h-5 w-56 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />

                                            {/* Product Type & Attribute */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                                <span className="text-zinc-300 dark:text-zinc-600">•</span>
                                                <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                            </div>

                                            {/* Price */}
                                            <div className="space-y-1">
                                                <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="absolute top-0 right-0 w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                    </div>

                                    {/* Stock Status & Quantity Controls */}
                                    <div className="mt-4 flex items-center justify-between">
                                        {/* Stock Status */}
                                        <div className="h-4 w-44 bg-zinc-200 dark:bg-zinc-700 rounded" />

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-600 rounded-md">
                                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                            <div className="w-12 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Item 3 */}
                        <div className="flex py-6 sm:py-8">
                            {/* Product Image */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />

                            {/* Product Info */}
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                <div className="relative">
                                    {/* Header with Remove Button */}
                                    <div className="flex justify-between">
                                        <div className="flex-1 min-w-0 pr-8">
                                            {/* Product Name */}
                                            <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />

                                            {/* Product Type & Attribute */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                                <span className="text-zinc-300 dark:text-zinc-600">•</span>
                                                <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                            </div>

                                            {/* Price */}
                                            <div className="space-y-1">
                                                <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="absolute top-0 right-0 w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                    </div>

                                    {/* Stock Status & Quantity Controls */}
                                    <div className="mt-4 flex items-center justify-between">
                                        {/* Stock Status */}
                                        <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-700 rounded" />

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-600 rounded-md">
                                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                            <div className="w-12 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Order Summary */}
                <section className="mt-16 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                    {/* Summary Title */}
                    <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />

                    <dl className="mt-6 space-y-4">
                        {/* Shipping */}
                        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Free Shipping Info */}
                        <div className="h-3 w-56 bg-zinc-200 dark:bg-zinc-700 rounded" />

                        {/* IVA */}
                        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
                            <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                    </dl>

                    {/* Checkout Button */}
                    <div className="mt-6 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-md" />

                    {/* Continue Shopping Link */}
                    <div className="mt-6 text-center">
                        <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto" />
                    </div>
                </section>
            </div>
        </main>
    );
}
