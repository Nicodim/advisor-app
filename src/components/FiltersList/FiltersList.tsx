import React from 'react';
import { SortButton, FilterSelect } from '../../shared';
import {FilterListBox} from "./styles";
import {FiltersListProps} from "./types";



const FiltersList: React.FC<FiltersListProps> = ({
                                                     filterStatus,
                                                     filterLanguage,
                                                     handleSortClick,
                                                     handleFilterChange,
                                                 }) => {
    return (
        <FilterListBox>
            <SortButton onClick={handleSortClick}>Sort by Reviews</SortButton>
            <FilterSelect
                value={filterStatus}
                onChange={(selectedValue: string | null) =>
                    handleFilterChange('status', selectedValue)
                }
                options={['Online', 'Offline']}
                label={'Filter by Status'}
            />

            <FilterSelect
                value={filterLanguage}
                onChange={(selectedValue: string | null) =>
                    handleFilterChange('language', selectedValue)
                }
                options={['English', 'Spanish', 'French', 'German']}
                label={'Filter by Language'}
            />
        </FilterListBox>
    );
};

export default FiltersList;
