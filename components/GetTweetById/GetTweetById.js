"use client";

import { useState } from 'react';
import styles from './GetTweetById.module.scss';

const fetchTweetById = async (id) => {
    try {
        const response = await fetch(`/api/twitter/getTweetById?id=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tweet:', error);
        return null;
    }
};

export default function GetTweetById() {
    const [tweetId, setTweetId] = useState('1802010958828843203'); // Pre-filled tweet ID
    const [tweetData, setTweetData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchTweet = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await fetchTweetById(tweetId);
        setTweetData(data);
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleFetchTweet} className={styles.form}>
                <input
                    type="text"
                    value={tweetId}
                    onChange={(e) => setTweetId(e.target.value)}
                    placeholder="Enter Tweet ID"
                    className={styles.input}
                />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Tweet'}
                </button>
            </form>
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