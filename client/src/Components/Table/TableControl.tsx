import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import Dropdown from '../Dropdown';
import CreateShortUrl from '../Urls/CreateShortUrl';

interface TableControlProps {
    search: string;
    setSearch: (search: string) => void;
    limit: number;
    pagination:
        | {
              currentPage: number;
              totalPages: number;
              totalCount: number;
              hasNext: boolean;
              hasPrev: boolean;
          }
        | undefined;
    setSearchQuery: (search: string) => void;
    handleLimitChange: (limit: number) => void;
}

const TableControl = ({
    search,
    setSearch,
    limit,
    pagination,
    setSearchQuery,
    handleLimitChange,
}: TableControlProps) => {
    return (
        <div className="py-1 text-foreground mt-4 flex justify-between items-start">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search URLs..."
                            className="pl-9 pr-9 w-64"
                        />
                        {search && (
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setSearchQuery('');
                                }}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground text-muted-foreground transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    {pagination && (
                        <div className="text-sm text-muted-foreground">
                            Showing {(pagination.currentPage - 1) * limit + 1}{' '}
                            to{' '}
                            {Math.min(
                                pagination.currentPage * limit,
                                pagination.totalCount
                            )}
                        </div>
                    )}
                    <Dropdown
                        setLimit={handleLimitChange}
                        currentLimit={limit}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <CreateShortUrl text="Create" />
            </div>
        </div>
    );
};

export default TableControl;
