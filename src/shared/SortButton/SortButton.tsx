import React, {FC, useState} from 'react';
import styled from 'styled-components';

const SortButtonContainer = styled.button`
  margin-right: 8px;
  padding: 8px;
  display: block;
  background: #375a7f;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 8px;
`;


interface SortButtonProps {
    onClick: () => void;
    children : string;
}
const SortButton: React.FC<SortButtonProps> = ({  onClick, children  }) => (
    <SortButtonContainer onClick={onClick}>
        {children }
    </SortButtonContainer>
);

export default SortButton;

