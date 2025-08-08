import { Skeleton } from '../ui/skeleton';

const TableSkeleton = () => {
    return (
        <div>
            {[...Array(5)].map((_, i) => (
                <div
                    className="bg-background text-xs text-foreground border-t table-grid"
                    key={i}
                >
                    <div className="flex items-center px-4 py-4 gap-2">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center px-4 py-4">
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="px-4 py-4 flex items-center justify-center">
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="px-4 py-4 flex items-center justify-center">
                        <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="px-4 py-4 flex items-center justify-center">
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center justify-center px-4 py-4 gap-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
