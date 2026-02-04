"use client"; 
import {
    UserPen,
    SettingsIcon,
    PackageIcon,
    CircleDollarSign,
    LucideIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";

type Tab = {
    name: string, 
    href: string, 
    icon: string
}

type TabsProps = {
    tabs: Tab[]; 
}

//? This iconMapping makes possible to use the Tabs component in a server component, since passing a 
//? LucideIcon type of data can only be done inside a client component
const iconMap: Record<string, LucideIcon> = {
    user: UserPen,
    settings: SettingsIcon,
    package: PackageIcon,
    payments: CircleDollarSign,
};

export default function Tabs({ tabs } : TabsProps) {
    const currentPathname = usePathname();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 200;
        const newScrollLeft =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
        });

        setTimeout(checkScroll, 300);
    };

    const scrollToActive = () => {
        const container = scrollContainerRef.current;
        const activeTab = container?.querySelector('[aria-current="page"]');

        if (activeTab && container) {
            const tabLeft = (activeTab as HTMLElement).offsetLeft;
            const tabWidth = (activeTab as HTMLElement).offsetWidth;
            const containerWidth = container.clientWidth;
            const scrollLeft = container.scrollLeft;

            // Center the active tab in the viewport
            if (tabLeft < scrollLeft) {
                container.scrollLeft = tabLeft - 20;
            } else if (tabLeft + tabWidth > scrollLeft + containerWidth) {
                container.scrollLeft = tabLeft + tabWidth - containerWidth + 20;
            }

            setTimeout(checkScroll, 100);
        }
    };

    useEffect(() => {
        scrollToActive();
    }, [currentPathname]);

	return (
		<div>
            {/* Mobile Tabs Navigation - Horizontal Scrollable */}
			<div className="sm:hidden">
                <div className="relative border-b border-zinc-200 dark:border-white/10">
                    {/* Left scroll button */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-0 h-full z-10 px-2 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent flex items-center"
                            aria-label="Scroll left"
                        >
                            <ChevronLeftIcon size={18} className="text-zinc-600 dark:text-zinc-400" />
                        </button>
                    )}

                    {/* Scrollable tabs container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="overflow-x-auto scrollbar-hide"
                    >
                        <nav
                            aria-label="Tabs"
                            className="flex space-x-1 px-2 py-0 min-w-min"
                        >
                            {tabs.map((tab) => {
                                const IconComponent = iconMap[tab.icon as keyof typeof iconMap];
                                const isActive = currentPathname === tab.href;

                                return (
                                    <a
                                        key={tab.name}
                                        href={tab.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`
                                            inline-flex items-center gap-2 px-3 py-3 text-xs font-medium whitespace-nowrap
                                            border-b-2 transition-all duration-200
                                            ${
                                                isActive
                                                    ? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
                                                    : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300"
                                            }
                                        `}
                                    >
                                        {IconComponent && (
                                            <IconComponent
                                                aria-hidden="true"
                                                className={`
                                                    size-4 flex-shrink-0
                                                    ${
                                                        isActive
                                                            ? "text-orange-500 dark:text-orange-400"
                                                            : "text-zinc-400 dark:text-zinc-500"
                                                    }
                                                `}
                                            />
                                        )}
                                        <span>{tab.name}</span>
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right scroll button */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-0 h-full z-10 px-2 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent flex items-center"
                            aria-label="Scroll right"
                        >
                            <ChevronRightIcon size={18} className="text-zinc-600 dark:text-zinc-400" />
                        </button>
                    )}
                </div>
			</div>

            {/* Desktop Tabs Navigation */}
			<div className="hidden sm:block">
				<div className="border-b border-zinc-200 dark:border-white/10">
					<nav aria-label="Tabs" className="-mb-px flex space-x-8">
						{tabs.map((tab) => {
							const IconComponent = iconMap[tab.icon as keyof typeof iconMap];
							return (
								<a
									key={tab.name}
									href={tab.href}
									aria-current={currentPathname === tab.href ? "page" : undefined}
									className={`
										${currentPathname === tab.href
											? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
											: "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-zinc-300"
										}
										group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium
									`}
								>
									{IconComponent && (
										<IconComponent
											aria-hidden="true"
											className={`
												${currentPathname === tab.href
													? "text-orange-500 dark:text-orange-400"
													: "text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400"
												}
												mr-2 -ml-0.5 size-5
											`}
										/>
									)}
									<span>{tab.name}</span>
								</a>
							);
						})}
					</nav>
				</div>
			</div>
		</div>
	);
}
