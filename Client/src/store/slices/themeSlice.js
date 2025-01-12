import { createSlice } from "@reduxjs/toolkit";

const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('chakra-ui-color-mode');
    return theme ? theme : "light";  // Since theme is a string, no need to parse it
}

const initialState = getThemeFromLocalStorage();

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            const newTheme = action.payload;
            localStorage.setItem('chakra-ui-color-mode', newTheme);
            return newTheme;
        },
        toggleTheme: (state) => {
            const newTheme = state === 'light' ? 'dark' : 'light';
            localStorage.setItem('chakra-ui-color-mode', newTheme);
            return newTheme;
        }
    }
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
