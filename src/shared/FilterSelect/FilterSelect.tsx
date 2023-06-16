import React from 'react';
import {customStyles, Label, LabelText, StyledSelect} from "./styles";
import {FilterSelectProps} from "./types";

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
