import styled from "styled-components";
import Select from "react-select";

export const customStyles = {
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

export const StyledSelect = styled(Select)`
  width: 155px;
  
  .Select__control {
    ${customStyles.control}
  }

  .Select__single-value {
    ${customStyles.singleValue}
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;

`;

export const LabelText = styled.span`
  margin-right: 8px;
  color: #000;
  font-size: 16px;
  font-weight: bold
`;