import { Link } from 'react-router-dom';
import Copy from '../Utils/Copy';
import Delete from '../Utils/Delete';
import Share from '../Utils/Share';
import { Settings } from 'lucide-react';
import type { Url } from '@/types/url';

interface TableRowsProps {
    url: Url;
    handleMouseEnter: (urlId: string) => void;
    dialog: { isOpen: boolean; url?: Url | null };
    setDialog: React.Dispatch<
        React.SetStateAction<{ isOpen: boolean; url?: Url | null }>
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
        <div
            className=" bg-background text-xs text-foreground border-t table-grid"
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
                    to={`/visit/${url.id}`}
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
                {/* <button className="cursor-pointer">
                    <Settings
                        size={20}
                        strokeWidth={1}
                        className="hover:rotate-45 transition-transform duration-300"
                    />
                </button> */}
                <Delete
                    url={url}
                    deleteDialog={dialog}
                    setDeleteDialog={setDialog}
                />
                <Share value={url.shortLink} />
            </div>
        </div>
    );
};

export default TableRows;
