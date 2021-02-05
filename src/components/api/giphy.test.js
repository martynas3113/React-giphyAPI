import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Giphy from './giphy';
//Cheking if input and button renders correctly
it('renders without crashing', () => {
    const {queryByTestId, queryByPlaceholderText} = render(<Giphy/>)
    
    expect(queryByTestId("search-button")).toBeTruthy();
    expect(queryByPlaceholderText("Search for GIFS")).toBeTruthy();
});

//Checking searchbox value to change when entering text
describe("Input value", ()=> {
    it("updates on change", () => {
        const {queryByPlaceholderText} = render(<Giphy/>);

        const searchInput = queryByPlaceholderText("Search for GIFS");

        fireEvent.change(searchInput, {target: {value: "test"}});

        expect(searchInput.value).toBe("test");

    });
});
