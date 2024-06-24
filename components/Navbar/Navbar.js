// components/Navbar.js
"use client";
import React, { useContext } from 'react';
import ThemeContext from '../../lib/context/ThemeContext';
import { ThemeToggle } from '../theme-toggle';
import AuthButtons from '../auth-buttons/auth-buttons';
import profileImage from "../profile-image/ProfileImage";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import ProfileImage from "../profile-image/ProfileImage";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    // console.log('Profile:', profile);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeClass = theme === 'dark' ? styles['theme-dark'] : styles['theme-light'];

    // const imageUrl = profile?.image || '/default-profile-image.png'; // Provide a default image URL
    return (
        <nav className={themeClass}>
            <header className={styles["site-header"]}>
                <div className={styles["nav-container"]}>
                    <Link href="/" className={styles["nav-link"]}>
                        Home
                    </Link>
                    <Link href="/dashboard" className={styles["nav-link"]}>
                        Dashboard
                    </Link>
                    <Link href="/xprofile" className={styles["nav-link"]}>
                        XProfile
                    </Link>
                    <AuthButtons />
                    {session && <ProfileImage imageUrl={session.user.image} />}
                    <ThemeToggle mode={theme} toggleMode={toggleTheme} />
                </div>
            </header>
        </nav>
    );
};

export default Navbar;
