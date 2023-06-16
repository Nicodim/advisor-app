import React, {FC} from 'react';
import { SortButtonContainer } from "./styles";
import {SortButtonProps} from "./types";


const SortButton:FC<SortButtonProps> = ({  onClick, children  }) => (
    <SortButtonContainer onClick={onClick}>
        {children }
    </SortButtonContainer>
);

export default SortButton;

