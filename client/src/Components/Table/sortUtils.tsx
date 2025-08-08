import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export const renderSortIcon = (
    sortState: 'ascending' | 'descending' | 'unsorted' | null
) => {
    switch (sortState) {
        case 'ascending':
            return <ChevronUp size={12} />;
        case 'descending':
            return <ChevronDown size={12} />;
        case 'unsorted':
        default:
            return <ChevronsUpDown size={12} />;
    }
};
