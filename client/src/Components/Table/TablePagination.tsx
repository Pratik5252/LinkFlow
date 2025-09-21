import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import type { PaginatedUrlsResponse } from '@/types/url';

interface TablePaginationProps {
    urlsResponse: PaginatedUrlsResponse | undefined;
    limit: number;
    setPage: (page: number) => void;
}

const TablePagination = ({
    urlsResponse,
    limit,
    setPage,
}: TablePaginationProps) => {
    const pagination = urlsResponse?.pagination;
    // Enhanced pagination handlers with validation
    const handleNext = () => {
        if (pagination?.hasNext && pagination?.currentPage !== undefined) {
            setPage(pagination.currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (pagination?.hasPrev && pagination?.currentPage !== undefined) {
            setPage(pagination.currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    // Generate page numbers for pagination
    const generatePageNumbers = () => {
        if (!pagination) return [];

        const { currentPage, totalPages } = pagination;
        const pages = [];
        const maxVisible = limit; // Maximum visible page numbers

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxVisible - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };
    return (
        <Pagination className="">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevious}
                        className={`cursor-pointer ${
                            !pagination?.hasPrev
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }`}
                    />
                </PaginationItem>

                {/* Page numbers */}
                {generatePageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            onClick={() => handlePageClick(pageNumber)}
                            isActive={pageNumber === pagination?.currentPage}
                            className="cursor-pointer"
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Show ellipsis if there are more pages */}
                {pagination &&
                    generatePageNumbers().length > 0 &&
                    pagination.totalPages >
                        Math.max(...generatePageNumbers()) && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        className={`cursor-pointer ${
                            !pagination?.hasNext
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
