import Logo from "./Logo";
import Link from "next/link";

export default function Example() {
	return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-stone-900">
            <div className="text-center">
                <div className="flex justify-center shrink-0 items-center mb-12">
                    <Logo mini />
                </div>
                <p className="text-base font-semibold text-amber-600 dark:text-amber-400">
                    404
                </p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-stone-900 sm:text-7xl dark:text-white">
                    Page not found
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-stone-500 sm:text-xl/8 dark:text-stone-400">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/"
                        className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 dark:focus-visible:outline-amber-500"
                    >
                        Go back home
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-semibold text-stone-900 dark:text-white"
                    >
                        Contact support{" "}
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
	);
}
