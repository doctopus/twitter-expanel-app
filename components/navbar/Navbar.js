// components/Navbar.js
"use client";
import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { ThemeToggle } from '../theme-toggle';
import Link from "next/link";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeClass = theme === 'dark' ? styles['theme-dark'] : styles['theme-light'];

    return (
        <nav className={themeClass}>
            <header className={styles["site-header"]}>
                <div className={styles["nav-container"]}>
                    <Link href="/" className={styles["nav-link"]}>
                        Home
                    </Link>
                    <Link href="/xprofile" className={styles["nav-link"]}>
                        XProfile
                    </Link>
                    <ThemeToggle mode={theme} toggleMode={toggleTheme} />
                </div>
            </header>
        </nav>
    );
};

export default Navbar;
