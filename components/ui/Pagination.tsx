import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type PaginationProps = {
    route: string;      // Route for pagination
    page: number;       // Current page
    totalPages: number; // Total number of pages
    maxPageButtons?: number; // Maximum number of page buttons to show (optional)
};

export default function Pagination({ route, page, totalPages, maxPageButtons = 5 }: PaginationProps) {
    // Get current url query params to safely rebuild url
    const searchParams = useSearchParams(); 

    // Build pagination URL's
    const buildPageHref = (pageNum: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", pageNum.toString());

        return `/${route}?${params.toString()}`;
    };


    // Default to 5 page buttons (or less if fewer total pages)
    const actualMaxButtons = Math.min(maxPageButtons, totalPages);
    
    // Calculate which pages to show
    const getVisiblePages = () => {
        // If we have fewer pages than max buttons, show all pages
        if (totalPages <= actualMaxButtons) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        // Always show first and last page
        // Other buttons will be distributed around current page
        const sideButtonCount = Math.floor((actualMaxButtons - 2) / 2);
        
        let startPage = Math.max(2, page - sideButtonCount);
        let endPage = Math.min(totalPages - 1, page + sideButtonCount);
        
        // Adjust if we're near the beginning or end
        if (startPage <= 2) {
            endPage = Math.min(1 + actualMaxButtons, totalPages - 1);
        }
        if (endPage >= totalPages - 1) {
            startPage = Math.max(2, totalPages - actualMaxButtons);
        }
        
        const visiblePages = [1];
        
        // Add ellipsis after first page if needed
        if (startPage > 2) {
            visiblePages.push(-1); // -1 represents an ellipsis
        }
        
        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            visiblePages.push(-2); // -2 represents an ellipsis
        }
        
        // Add last page if we have more than one page
        if (totalPages > 1) {
            visiblePages.push(totalPages);
        }
        
        return visiblePages;
    };
    
    const visiblePages = getVisiblePages();

    return (
        <nav className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-500 px-4 my-12">
            {/* Previous page button */}
            {page > 1 && (
                <div className="-mt-px flex w-0 flex-1">
                    <Link
                        scroll={false}
                        href={buildPageHref(page - 1)}
                        aria-label="Previous page"
                        className="
                            inline-flex items-center 
                            border-t-2 border-transparent 
                            pt-4 pr-1 
                            text-sm font-medium 
                            text-zinc-500 
                            hover:border-zinc-300 hover:text-zinc-700
                            dark:hover:border-orange-200 dark:hover:text-orange-200
                            transition-colors duration-200
                        "
                    >
                        <ArrowLeft aria-hidden="true" className="mr-3 size-5" />
                        Anterior
                    </Link>
                </div>
            )}

            {/* Page buttons */}
            {visiblePages.map((pageNum, index) => {
                // Render ellipsis
                if (pageNum < 0) {
                    return (
                        <span 
                            key={`ellipsis-${index}`}
                            className="flex items-center justify-center w-10 h-10 text-zinc-600"
                        >
                            &hellip;
                        </span>
                    );
                }
                
                // Render page button
                return (
                    <Link
                        scroll={false}
                        key={`page-${pageNum}`}
                        href={buildPageHref(pageNum)}
                        className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-zinc-500 ${
                            page === pageNum
                                ? "border-amber-500 text-amber-600 ring-amber-500 hover:border-orange-300 hover:text-amber-300"
                                : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:hover:border-orange-200 dark:hover:text-orange-300"
                        } transition-colors duration-200`}
                    >
                        {pageNum}
                    </Link>
                );
            })}

            {/* Next page button */}
            {page < totalPages && (
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <Link
                        scroll={false}
                        href={buildPageHref(page + 1)}
                        aria-label="Next page"
                        className="
                            inline-flex items-center 
                            border-t-2 border-transparent 
                            pt-4 pl-1 
                            text-sm font-medium text-zinc-500 
                            hover:border-zinc-300 dark:hover:border-orange-200 dark:hover:text-orange-200 hover:text-zinc-700
                            transition-colors duration-200
                        "
                    >
                        Siguiente
                        <ArrowRight aria-hidden="true" className="ml-3 size-5" />
                    </Link>
                </div>
            )}
        </nav>
    );
}