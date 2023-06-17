import React from 'react';
import { render } from '@testing-library/react';
import SortButton from './SortButton';

describe('SortButton', () => {
    test('render', () => {
        expect(() => {
            render(<SortButton onClick={() => {}} >{'fd'}</SortButton>);
        }).toThrowError('The prop `children` is marked as required');
    });
});
