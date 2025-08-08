import { NoData } from '@/assets/illustrations/NoData';
import CreateShortUrl from '../Urls/CreateShortUrl';

interface EmptyStatesProps {
    hasUrls: boolean;
    hasSearchResults: boolean;
    searchQuery: string;
    isLoading: boolean;
}

const EmptyStates = ({
    hasUrls,
    hasSearchResults,
    searchQuery,
    isLoading,
}: EmptyStatesProps) => {
    if (isLoading) return null;

    // First time user - no URLs at all
    if (!hasUrls) {
        return (
            <div className="w-full h-full min-h-[300px] flex flex-col justify-center items-center gap-2">
                <p className="text-muted-foreground font-bold">
                    Nothing here yet!
                </p>
                <NoData />
                <div className="flex flex-col justify-center items-center mt-4 gap-2">
                    <p className="text-muted-foreground text-sm">
                        Create your first short link!
                    </p>
                    <CreateShortUrl text="Create" />
                </div>
            </div>
        );
    }

    // Search returned no results
    if (!hasSearchResults && searchQuery) {
        return (
            <div className="w-full h-full min-h-[200px] flex flex-col justify-center items-center gap-4">
                <div className="text-center">
                    <p className="text-muted-foreground font-semibold text-lg">
                        No results found
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                        No URLs match "{searchQuery}"
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default EmptyStates;
