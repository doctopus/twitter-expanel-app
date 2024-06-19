"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import styles from './fetcherStyles.module.scss';

const fetchTweetById = async (id) => {
    try {
        const response = await fetch(`/api/twitter/fetchTweetById?id=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tweet:', error);
        return null;
    }
};

export default function TweetFetcher() {
    const [tweetData, setTweetData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchTweet = async () => {
        setLoading(true);
        const tweetId = '1802010958828843203'; // Replace with your actual tweet ID
        const data = await fetchTweetById(tweetId);
        setTweetData(data);
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {loading && <Skeleton />}
                {!loading && tweetData && (
                    <div className={styles.tweet}>
                        <h2>Tweet Details</h2>
                        <p><strong>Tweet ID:</strong> {tweetData.id_str}</p>
                        <p><strong>Text:</strong> {tweetData.full_text || 'No text available'}</p>
                        <p><strong>Created At:</strong> {new Date(tweetData.tweet_created_at).toLocaleString()}</p>
                        <p><strong>Likes:</strong> {tweetData.favorite_count}</p>
                        <p><strong>Retweets:</strong> {tweetData.retweet_count}</p>
                    </div>
                )}
            </div>
            <div className={styles["button-container"]}>
                <button className={styles.button} onClick={handleFetchTweet}>
                    {loading ? 'Loading...' : 'Fetch Tweet'}
                </button>
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
