import { ChevronRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

type pages = {
    name: string;
    href: string;
    current: boolean;
}[]

type BreadcrumProps = {
    pages: pages; 
}

export default function Breadcrumb({ pages } : BreadcrumProps) {
	return (
		<nav aria-label="Breadcrumb" className="flex">
			<ol role="list" className="flex items-center space-x-4">
				<li>
					<div>
						<Link
							href="/home"
							className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300"
						>
							<HomeIcon
								aria-hidden="true"
								className="size-5 shrink-0"
							/>
							<span className="sr-only">Inicio</span>
						</Link>
					</div>
				</li>
				{pages.map((page) => (
					<li key={page.name}>
						<div className="flex items-center">
							<ChevronRightIcon
								aria-hidden="true"
								className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
							/>
							<Link
								href={page.href}
								aria-current={page.current ? "page" : undefined}
								className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
							>
								{page.name}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}
