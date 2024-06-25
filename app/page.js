import React from 'react';
import { BentoGrid, BentoItem } from '../components/BentoGrid/BentoGrid';
import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Expanela</h1>
                <p className={styles.subtitle}>Display Your Tweeter Contributions Graph in Your 𝕏 Profile!</p>
            </header>

            <BentoGrid columns={5} rows={5}>
                <BentoItem width={2} height={2}>
                    <h2>Visualize Your Impact</h2>
                    <p>See your Twitter activity come to life with our beautiful, interactive graphs.</p>
                </BentoItem>
                <BentoItem width={3} height={2}>
                    <h2>Easy Integration</h2>
                    <p>Seamlessly add your contribution graph to your Twitter profile with just a few clicks.</p>
                </BentoItem>
                <BentoItem width={3} height={2}>
                    <h2>Customizable Themes</h2>
                    <p>Choose from a variety of color schemes and styles to match your personal brand.</p>
                </BentoItem>
                <BentoItem width={2} height={2}>
                    <h2>Insightful Analytics</h2>
                    <p>Gain valuable insights into your Twitter engagement and growth over time.</p>
                </BentoItem>
                <BentoItem width={1} height={1}>
                    <h2>Real-time Updates</h2>
                    <p>Your graph updates automatically, always showing your latest Twitter activity.</p>
                </BentoItem>
                <BentoItem width={1} height={1}>
                    <h2>Privacy Focused</h2>
                    <p>We prioritize your data privacy and security, giving you full control over what's displayed.</p>
                </BentoItem>
                <BentoItem width={3} height={1}>
                    <h2>Mobile Friendly</h2>
                    <p>Your contribution graph looks great on all devices, from desktop to mobile.</p>
                </BentoItem>
                <BentoItem width={5} height={1}>
                    <h2>Export Options</h2>
                    <p>Easily export your graph as an image to use in presentations or other social media platforms.</p>
                </BentoItem>
            </BentoGrid>
        </div>
    );
}