"use client";
import React, { useContext } from 'react';
import ThemeContext from '../theme-toggle/context/ThemeContext';
import styles from './Footer.module.scss';

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    const themeClass = theme === 'dark' ? styles['dark-mode'] : styles['light-mode'];

    return (
        <footer className={`${styles['site-footer']} ${themeClass}`}>
            <div className={styles['footer-content']}>
                <div className={styles['footer-section']}>
                    <h3>About Expanela</h3>
                    <p>Theme Your 𝕏</p>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Follow Us</h3>
                    <ul className={styles['social-links']}>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                    <p>&copy; {new Date().getFullYear()} Expanela</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
