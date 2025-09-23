import { getUrls, getUrlsWithMetrics, getUrlVisits } from '@/services/url';
import type { Url } from '@/types/url';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSortableData } from '@/hooks/useSortableData';
import { useEffect, useState } from 'react';
import { UrlOverviewMetrics } from './UrlOverviewMetrics';
import TablePagination from '../Table/TablePagination';
import TableSkeleton from '../Table/TableSkeleton';
import TableRows from '../Table/TableRows';
import TableControl from '../Table/TableControl';
import TableHeader from '../Table/TableHeader';
import EmptyStates from '../Table/EmptyStates';
import { renderSortIcon } from '../Table/sortUtils';

const GetUrls = () => {
    const [dialog, setDialog] = useState<{
        isOpen: boolean;
        url: Url | null;
    }>({
        isOpen: false,
        url: null,
    });

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Handler to reset page when limit changes
    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(search);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const queryClient = useQueryClient();

    // Fetch paginated URLs for table display
    const { data: urlsResponse, isLoading } = useQuery({
        queryKey: ['urls', page, limit, searchQuery],
        queryFn: () => getUrls(page, limit, searchQuery),
        staleTime: 30000,
        refetchOnWindowFocus: false,
    });

    // Fetch all URLs with metrics for overview calculations
    const { data: allUrls = [] } = useQuery({
        queryKey: ['urls-metrics'],
        queryFn: () => getUrlsWithMetrics(),
        refetchInterval: 5000,
        staleTime: 5000,
    });

    // Extract URLs array from paginated response
    const urls = urlsResponse?.urls || [];
    const pagination = urlsResponse?.pagination;

    const { items, requestSort, getSortIndicator } = useSortableData(urls);

    const renderSortIconForKey = (key: string) => {
        const sortState = getSortIndicator(key);
        return renderSortIcon(sortState);
    };

    const handleMouseEnter = (urlId: string) => {
        queryClient.prefetchQuery({
            queryKey: ['visits', urlId],
            queryFn: () => getUrlVisits(urlId),
            staleTime: 1000 * 60 * 5,
        });
    };

    return (
        <div className="max-w-6xl h-full w-full mx-8 mb-2 p-2">
            {/* Overview Metrics - now handles empty state internally */}

            <UrlOverviewMetrics urls={allUrls} />

            {/* Table Control */}
            {allUrls.length != 0 ? (
                <TableControl
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    pagination={pagination}
                    setSearchQuery={setSearchQuery}
                    handleLimitChange={handleLimitChange}
                />
            ) : null}

            {/* Table Headers */}
            <div className={`mt-2 overflow-hidden h-[${3 * limit}vh] mb-2`}>
                {urls.length > 0 && (
                    <TableHeader
                        renderSortIcon={renderSortIconForKey}
                        requestSort={requestSort}
                    />
                )}

                <EmptyStates
                    hasUrls={allUrls.length > 0}
                    hasSearchResults={urls.length > 0}
                    searchQuery={searchQuery}
                    isLoading={isLoading}
                />

                {isLoading && <TableSkeleton />}
                {/* {error && <div>Error</div>} */}

                {/* Table Rows */}
                {urls && (
                    <div className="flex flex-col gap-2 lg:flex lg:gap-0">
                        {items.map((url) => (
                            <TableRows
                                url={url}
                                handleMouseEnter={handleMouseEnter}
                                dialog={dialog}
                                setDialog={setDialog}
                            />
                        ))}
                    </div>
                )}
            </div>
            <TablePagination
                urlsResponse={urlsResponse}
                limit={limit}
                setPage={setPage}
            />
        </div>
    );
};
export default GetUrls;
