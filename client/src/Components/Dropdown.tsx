import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
// import { deleteUrl } from "@/services/url";
import { DynamicIcon } from 'lucide-react/dynamic';

type Props = {
    setLimit: (limit: number) => void;
    currentLimit: number;
};

const Dropdown = ({ setLimit, currentLimit }: Props) => {
    const limitRange = [5, 10, 15, 30];

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
                Show:
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    <DynamicIcon
                        name="rows-3"
                        size={16}
                        className="text-muted-foreground"
                    />
                    <span className="text-foreground font-medium">
                        {currentLimit}
                    </span>
                    <span className="text-muted-foreground text-xs">
                        per page
                    </span>
                    <DynamicIcon
                        name="chevron-down"
                        size={14}
                        className="text-muted-foreground ml-auto"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-44 p-1 shadow-lg"
                    align="end"
                    sideOffset={4}
                >
                    {limitRange.map((num) => (
                        <DropdownMenuItem
                            key={num}
                            className={`cursor-pointer flex items-center justify-between px-3 py-2.5 text-sm rounded-sm transition-all duration-150 ${
                                num === currentLimit
                                    ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                            onClick={() => setLimit(num)}
                        >
                            <span className="flex items-center gap-2">
                                <DynamicIcon
                                    name="hash"
                                    size={12}
                                    className="opacity-60"
                                />
                                {num} per page
                            </span>
                            {num === currentLimit && (
                                <DynamicIcon
                                    name="check"
                                    size={14}
                                    className="text-primary-foreground opacity-80"
                                />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Dropdown;
