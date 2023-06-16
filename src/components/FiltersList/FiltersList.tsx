import React from 'react';
import styled from 'styled-components';
import { SortButton, FilterSelect } from '../../shared';

const FilterListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface FilterBoxProps {
    filterStatus: string | null;
    filterLanguage: string | null;
    handleSortClick: () => void;
    handleFilterChange: (filterType: string, selectedValue: string | null) => void;
}


const FilterList: React.FC<FilterBoxProps> = ({
                                                 filterStatus,
                                                 filterLanguage,
                                                 handleSortClick,
                                                  handleFilterChange
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
                label={'Filter by Status:'}
            />

            <FilterSelect
                value={filterLanguage}
                onChange={(selectedValue: string | null) =>
                    handleFilterChange('language', selectedValue)
                }
                options={['English', 'Spanish', 'French', 'German']}
                label={'Filter by Language:'}
            />

        </FilterListBox>
    );
};

export default FilterList;