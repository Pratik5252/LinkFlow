import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { VisitResponse } from '@/types/visits';
import type { Url } from '@/types/url';
import { getUrlVisits } from '@/services/url';
import UrlVisits from '../Urls/UrlVisits';
import { useQuery } from '@tanstack/react-query';

const VisualData = () => {
    const { urlId } = useParams();
    const [selectedUrl] = useState<Url | null>(null);

    const { data, isLoading, error } = useQuery<VisitResponse>({
        queryKey: ['visits', urlId],
        queryFn: () => getUrlVisits(urlId!),
        enabled: !!urlId,
        staleTime: 5 * 60 * 1000,
        refetchInterval: 30 * 1000,
    });

    return (
        <div className="w-full h-full flex justify-center items-center mt-4">
            {isLoading && <div>Loading.....</div>}
            {error && <div>error</div>}
            {data && (
                <UrlVisits
                    url={selectedUrl}
                    visits={data?.visits ?? []}
                    visitCount={data?.visitCount ?? 0}
                    loading={isLoading}
                />
            )}
        </div>
    );
};

export default VisualData;
