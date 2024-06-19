// components/footer/Footer.js
"use client";
import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import styles from './Footer.module.scss';

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    const themeClass = theme === 'dark' ? styles['dark-mode'] : styles['light-mode'];

    return (
        <footer className={`${styles['site-footer']} ${themeClass}`}>
            <p>&copy; 2024 Expanela. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
