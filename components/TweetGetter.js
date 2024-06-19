"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import styles from './getterStyles.module.scss';

const fetchTweets = async (query) => {
    try {
        const response = await fetch(`/api/twitter/fetchTweets?${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return null;
    }
};

export default function TweetGetter() {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('from:elonmusk -filter:replies');
    const [timeRange, setTimeRange] = useState('5m');

    const handleFetchTweets = async () => {
        setLoading(true);
        const data = await fetchTweets(`query=${encodeURIComponent(query)}&within_time=${encodeURIComponent(timeRange)}`);
        setTweets(data);
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles["query-form"]}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your query"
                        className="query-input"
                    />
                    <input
                        type="text"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        placeholder="Time range (e.g., 1d)"
                        className={styles["query-input"]}
                    />
                    <button className="button" onClick={handleFetchTweets}>
                        {loading ? 'Loading...' : 'Fetch Tweets'}
                    </button>
                </div>
                {loading && <Skeleton />}
                {!loading && tweets.length > 0 && (
                    <div className={styles["tweets-container"]}>
                        {tweets.map((tweet, index) => (
                            <div key={index} className={styles.tweet}>
                                <p><strong>Date:</strong> {new Date(tweet.tweet_created_at).toLocaleString()}</p>
                                <p><strong>Text:</strong> {tweet.full_text || 'No text available'}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const Skeleton = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles["skeleton-line"]}></div>
            <div className={styles["skeleton-line"]}></div>
            <div className={styles["skeleton-line"]}></div>
        </div>
    );
};
