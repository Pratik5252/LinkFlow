import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import type { ReactElement } from 'react';

interface TableHeaderProps {
    renderSortIcon: (key: string) => ReactElement;
    requestSort: (key: string) => void;
}

const TableHeader = ({ renderSortIcon, requestSort }: TableHeaderProps) => {
    return (
        <div className="table-grid bg-background text-secondary-foreground text-sm font-light">
            <div className="px-4 py-3">Short URL</div>
            <div className="px-4 py-3">Original URL</div>
            <div className="px-4 py-3 flex items-center justify-center gap-1">
                <p>Analytics</p>
                <Tooltip>
                    <TooltipTrigger className="h-full mt-0.5">
                        <Info size={12} strokeWidth={1} />
                    </TooltipTrigger>
                    <TooltipContent className="border text-xs">
                        To enable analytics, go to the URL settings and verify
                        your website ownership.
                    </TooltipContent>
                </Tooltip>
            </div>
            <div
                className="px-4 py-3 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => requestSort('_count.visits')}
            >
                Visits
                {renderSortIcon('_count.visits')}
            </div>
            <div
                className="px-4 py-3 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => requestSort('createdAt')}
            >
                Date <span>{renderSortIcon('createdAt')}</span>
            </div>
            <div className="px-4 py-3 whitespace-nowrap flex items-center justify-center">
                Actions
            </div>
        </div>
    );
};

export default TableHeader;
