// app/layout.js
import Link from 'next/link';
import './global.css';
import './styles.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <title>Expanela</title>
        </head>
        <body>
        <header className="site-header">
            <div className="nav-container">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/xprofile" className="nav-link">XProfile</Link>
            </div>
        </header>
        <main className="site-content">
            <section className="site-banner">
                <h1 className="site-title">Expanela</h1>
                <p className="site-subtitle">Display Your Tweeter Contributions Graph in Your 𝕏 Profile!</p>
            </section>
            {children}
        </main>
        <footer className="site-footer">
            <p>&copy; 2024 Expanela. All rights reserved.</p>
        </footer>
        </body>
        </html>
    );
}
