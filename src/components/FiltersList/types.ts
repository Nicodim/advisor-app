export interface FiltersListProps {
    filterStatus: string | null;
    filterLanguage: string | null;
    handleSortClick: () => void;
    handleFilterChange: (filterType: string, selectedValue: string | null) => void;
}