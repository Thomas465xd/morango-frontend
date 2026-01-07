import Link from "next/link";

export default function Header() {
	return (
		<header className="">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-16">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-gray-700/20 hover:ring-gray-700/30 dark:ring-white/10 dark:hover:ring-white/20">
                        Announcing our next round of funding.{" "}
                        <a
                            href="#"
                            className="font-semibold text-amber-400"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute inset-0"
                            />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance dark:text-white sm:text-7xl">
                        Find and Secure Tickets for Your Favorite Events
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        Browse upcoming shows, discover new artists, and secure tickets in seconds. Everything you need to enjoy live events is right at your fingertips.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/browse"
                            className="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 tranistion-colors duration-200"
                        >
                            Browse Tickets
                        </Link>
                        <Link
                            href="#"
                            className="text-sm/6 font-semibold dark:text-white"
                        >
                            Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
		</header>
	);
}
