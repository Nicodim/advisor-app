import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#fff',
        borderRadius: 4,
        border: 'none',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#000',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#375a7f' : '#fff',
        color: '#000',
    }),
};

const StyledSelect = styled(Select)`
  width: 155px;
  
  .Select__control {
    ${customStyles.control}
  }

  .Select__single-value {
    ${customStyles.singleValue}
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;

`;

const LabelText = styled.span`
  margin-right: 8px;
  color: #000;
  font-size: 16px;
  font-weight: bold
`;

interface FilterSelectProps {
    value: string | null;
    onChange: (selectedValue: string | null) => void;
    options: string[];
    label: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange, options, label }) => {
    const handleSelectChange = (selectedOption: any) => {
        onChange(selectedOption?.value || null);
    };

    const selectOptions = options.map((option) => ({
        value: option,
        label: option,
    }));

    return (
        <Label>
            <LabelText>{label}</LabelText>
            <StyledSelect
                value={value ? { value: value, label: value } : null}
                onChange={handleSelectChange}
                options={selectOptions}
                isClearable
                styles={customStyles}
            />
        </Label>
    );
};

export default FilterSelect;
