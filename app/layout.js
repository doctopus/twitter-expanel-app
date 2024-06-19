// app/layout.js
import { ThemeProvider } from '../context/ThemeContext';
import './globals.scss';
import styles from './layout.module.scss';
import Navbar from '../components/navbar/Navbar';
import Footer from "../components/footer/Footer";

export default function RootLayout({ children }) {
    return (
        <ThemeProvider>
            <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <title>Expanela</title>
            </head>
            <body>
            <Navbar />
                <main className={styles['site-content']}>
                    <section className={styles['site-banner']}>
                        <h1 className={styles['site-title']}>Expanela</h1>
                        <p className={styles['site-subtitle']}>Display Your Tweeter Contributions Graph in Your 𝕏 Profile!</p>
                    </section>
                    {children}
                </main>
                <Footer />
            </body>
            </html>
        </ThemeProvider>
    );
}
