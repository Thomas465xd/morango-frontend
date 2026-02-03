import Image from 'next/image'
import LogoImage from "@/public/logo-no-bg.png"; // static import
import Link from 'next/link';
import { ShoppingBagIcon } from 'lucide-react';

export default function CheckoutNavBar() {
    return (
        <div 
            className={`
                bg-black/90 dark:bg-black/20 
                backdrop-blur-lg backdrop-filter transition-all duration-200 
                border-b border-zinc-500
            `}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="flex h-24 items-center justify-between">
                        {/* Logo (lg+) */}
                        <div className="hidden lg:flex lg:flex-1 lg:items-center">
                            <Link
                                href="/home"
                            >
                                <span className="sr-only">
                                    Morango Joyas
                                </span>
                                <Image
                                    src={LogoImage}
                                    alt="Company Logo"
                                    width={30}
                                    height={30}
                                    priority
                                    fetchPriority="high"
                                    loading="eager"
                                    className="object-contain h-auto w-auto"
                                    placeholder="empty"
                                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                                />
                            </Link>
                        </div>

                        <div className="hidden h-full lg:flex">
                            {/* Routes */}

                        </div>

                        {/* Logo (lg-) */}
                        <Link 
                            href="/home"
                            className="lg:hidden"
                        >
                            <span className="sr-only">
                                Morango Joyas
                            </span>
                            <Image
                                src={LogoImage}
                                alt="Company Logo"
                                width={30}
                                height={30}
                                priority
                                fetchPriority="high"
                                loading="eager"
                                className="object-contain h-auto w-auto"
                                placeholder="empty"
                                sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                            />
                        </Link>

                        <div className="flex flex-1 items-center justify-end">
                            <div className="flex items-center lg:ml-8">
                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-8">
                                    <Link
                                        href="/home/cart"
                                        className={`
                                            group -m-2 flex items-center p-2
                                            disabled:cursor-not-allowed disabled:opacity-50
                                        `}
                                    >
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="size-6 shrink-0 text-white"
                                        />
                                        <span 
                                            className={`
                                                ml-2 text-sm font-medium text-white
                                            `}
                                        >
                                            
                                        </span>
                                        <span className="sr-only">
                                            items en el carrito, ver carrito
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
