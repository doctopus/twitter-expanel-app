// context/ThemeContext.js
"use client";

import React, { createContext, useState, useEffect } from 'react';
import { getColorPreference } from '../../components/theme-toggle/getColorPreference';
import '../../app/globals.scss';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Only update the theme preference on the client side
        const initialTheme = getColorPreference();
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        localStorage.setItem('theme-preference', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme-preference', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
