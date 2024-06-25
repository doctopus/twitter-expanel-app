import SessionProviderWrapper from './providers/SessionProviderWrapper';
import { ThemeProvider } from '../components/theme-toggle/context/ThemeContext';
import './globals.scss';
import styles from './layout.module.scss';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";

export default function RootLayout({ children }) {
    return (
        <SessionProviderWrapper>
            <ThemeProvider>
                <html lang="en">
                <head>
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                    <title>Expanela</title>
                </head>
                <body className={styles.body}>
                <Navbar />
                <main className={styles.main}>
                    {children}
                </main>
                <Footer />
                </body>
                </html>
            </ThemeProvider>
        </SessionProviderWrapper>
    );
}