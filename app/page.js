// app/page.js
import TweetFetcher from '../components/TweetFetcher';
import TweetGetter from '../components/TweetGetter';
import styles from './layout.module.scss';

export default function Home() {
    return (
        <div className={styles["home-container"]}>
            <section className={styles["intro-section"]}>
                <h2 className={styles["intro-heading"]}>Discover Our Latest Innovations</h2>
                <p className={styles["intro-text"]}>Scroll down to explore more about what we offer.</p>
            </section>

            <div className={styles["bento-grid"]}>
                <div className={styles["bento-item"]}>
                    <div className={styles["bento-placeholder"]}>Placeholder Image</div>
                    <p className={styles["bento-text"]}>This is a description for item 1.</p>
                </div>
                <div className={styles["bento-item"]}>
                    <TweetFetcher/> {/* Add the TweetFetcher component here */}
                </div>
                <div className={styles["bento-item"]}>
                    <TweetGetter/>
                    <p className={styles["bento-text"]}>This is a description for item 3.</p>
                </div>
                <div className={styles["bento-item"]}>
                    <div className={styles["bento-placeholder"]}>Placeholder Image</div>
                    <p className={styles["bento-text"]}>This is a description for item 4.</p>
                </div>
            </div>
        </div>
    );
}
