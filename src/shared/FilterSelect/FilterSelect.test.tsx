import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterSelect from './FilterSelect';

describe('FilterSelect', () => {
    test('renders without crashing', () => {
        render(
            <FilterSelect
                value={null}
                onChange={() => {}}
                options={['Option 1', 'Option 2']}
                label="Select an option"
            />
        );
    });
});
