import { Link } from 'react-router-dom';
import Copy from '../Utils/Copy';
import Delete from '../Utils/Delete';
import Share from '../Utils/Share';
import type { Url } from '@/types/url';
import { EllipsisVertical, ExternalLink } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';

interface TableRowsProps {
    url: Url;
    handleMouseEnter: (urlId: string) => void;
    dialog: { isOpen: boolean; url: Url | null };
    setDialog: React.Dispatch<
        React.SetStateAction<{ isOpen: boolean; url: Url | null }>
    >;
}

const TableRows = ({
    url,
    handleMouseEnter,
    dialog,
    setDialog,
}: TableRowsProps) => {
    const formatDate = (date: string | Date) => {
        return new Date(date)
            .toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            })
            .replace(',', '');
    };
    return (
        <>
            <div
                className="bg-background text-xs text-foreground border-t table-grid"
                key={url.id}
            >
                <div className="flex items-center px-4 py-4 gap-2">
                    <Link
                        to={url.shortLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {url.shortLink}
                    </Link>
                    <div className="flex items-center">
                        <Copy url={url.shortLink} />
                    </div>
                </div>

                <div className="flex items-center px-4 py-4">
                    <Link
                        to={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {url.originalUrl}
                    </Link>
                </div>

                <div className=" px-4 py-4 flex items-center justify-center">
                    <Link
                        to={`visit/${url.id}`}
                        key={url.shortLink}
                        onMouseEnter={() => handleMouseEnter(url.id)}
                        className="hover:text-secondary-foreground transition-all duration-200"
                    >
                        {' '}
                        View
                    </Link>
                </div>

                <div className="px-4 py-4 flex items-center justify-center">
                    <p>{url._count.visits}</p>
                </div>

                <div className="px-4 py-4 flex items-center justify-center">
                    <p>{formatDate(url.createdAt)}</p>
                </div>

                <div className="flex items-center justify-center px-4 py-4 gap-4">
                    <Delete
                        url={url}
                        deleteDialog={dialog}
                        setDeleteDialog={setDialog}
                    />
                    <Share value={url.shortLink} />
                </div>
            </div>
            <div
                key={url.id}
                className="relative h-full flex justify-between items-center border  rounded hover:bg-muted/20 lg:hidden"
            >
                <div className="w-[50vw] h-fit flex flex-col py-4 px-4 gap-1">
                    <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">
                            Short Url
                        </p>
                        <div className="flex items-center gap-2 w-full">
                            <Link
                                to={url.shortLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {url.shortLink}
                            </Link>
                            <div className="flex items-center">
                                <Copy url={url.shortLink} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                        <p className="text-xs text-muted-foreground">
                            Original Url
                        </p>
                        <Link
                            to={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm truncate w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {url.originalUrl}
                        </Link>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col items-end justify-between py-4 px-4 gap-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className=" cursor-pointer">
                            <EllipsisVertical size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit flex flex-col items-center justify-center gap-2">
                            <Delete
                                url={url}
                                deleteDialog={dialog}
                                setDeleteDialog={setDialog}
                            />
                            <Share value={url.shortLink} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className=" flex items-center justify-center">
                        <Link
                            to={`visit/${url.id}`}
                            key={url.shortLink}
                            onMouseEnter={() => handleMouseEnter(url.id)}
                            className="hover:text-secondary-foreground transition-all duration-200"
                        >
                            {' '}
                            <ExternalLink size={16} />
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground border py-1 px-3 rounded-full">
                        Total Visit {url._count.visits}
                    </p>

                    {/* <div className="px-4 py-4 flex items-center justify-center">
                    <p>{formatDate(url.createdAt)}</p>
                </div> */}
                </div>
            </div>
        </>
    );
};

export default TableRows;
