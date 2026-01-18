export default function NavBarSkeleton() {
    return (
        <>
            {/* Primary navbar skeleton */}
            <div className="z-50 bg-zinc-800 dark:bg-zinc-800/50 border-b-zinc-700 border-b-2 animate-pulse">
                <div className="mx-auto flex-between h-14 max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Social icons skeleton */}
                    <div className="hidden lg:flex space-x-4">
                        <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
                        <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
                        <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
                        <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
                    </div>
                    
                    {/* Center text skeleton */}
                    <div className="h-4 w-48 bg-gray-700 rounded"></div>
                    
                    {/* Theme toggle skeleton */}
                    <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                </div>
            </div>

            {/* Secondary navbar skeleton */}
            <div className="bg-black/90 dark:bg-black/10 border-b-2 border-zinc-600 backdrop-blur-md animate-pulse">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-24 items-center justify-between">
                        {/* Logo skeleton (lg+) */}
                        <div className="hidden lg:flex lg:flex-1">
                            <div className="w-8 h-8 bg-gray-700 rounded"></div>
                        </div>

                        {/* Nav links skeleton */}
                        <div className="hidden lg:flex space-x-8">
                            <div className="h-4 w-16 bg-gray-700 rounded"></div>
                            <div className="h-4 w-20 bg-gray-700 rounded"></div>
                            <div className="h-4 w-20 bg-gray-700 rounded"></div>
                            <div className="h-4 w-32 bg-gray-700 rounded"></div>
                            <div className="h-4 w-20 bg-gray-700 rounded"></div>
                        </div>

                        {/* Mobile menu skeleton */}
                        <div className="flex flex-1 items-center lg:hidden space-x-2">
                            <div className="w-6 h-6 bg-gray-700 rounded"></div>
                            <div className="w-6 h-6 bg-gray-700 rounded"></div>
                        </div>

                        {/* Logo skeleton (mobile) */}
                        <div className="lg:hidden">
                            <div className="w-8 h-8 bg-gray-700 rounded"></div>
                        </div>

                        {/* Right side actions skeleton */}
                        <div className="flex flex-1 items-center justify-end space-x-4 lg:space-x-6">
                            <div className="hidden lg:block h-4 w-24 bg-gray-700 rounded"></div>
                            <div className="hidden lg:block h-4 w-20 bg-gray-700 rounded"></div>
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                                <div className="h-4 w-4 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}