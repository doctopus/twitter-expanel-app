// app/page.js
import TweetFetcher from '../components/TweetFetcher';
import TweetGetter from '../components/TweetGetter';

export default function Home() {
    return (
        <div className="home-container">
            <section className="intro-section">
                <h2 className="intro-heading">Discover Our Latest Innovations</h2>
                <p className="intro-text">Scroll down to explore more about what we offer.</p>
            </section>

            <div className="bento-grid">
                <div className="bento-item">
                    <div className="bento-placeholder">Placeholder Image</div>
                    <p className="bento-text">This is a description for item 1.</p>
                </div>
                <div className="bento-item">
                    <TweetFetcher/> {/* Add the TweetFetcher component here */}
                </div>
                <div className="bento-item">
                    <TweetGetter/>
                    <p className="bento-text">This is a description for item 3.</p>
                </div>
                <div className="bento-item">
                    <div className="bento-placeholder">Placeholder Image</div>
                    <p className="bento-text">This is a description for item 4.</p>
                </div>
            </div>
        </div>
    );
}
