"use client";

import { useState } from 'react';
import styles from './FetchTweets.module.scss';

const fetchTweets = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    try {
        const response = await fetch(`/api/twitter/fetchTweets?${queryString}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return null;
    }
};

const FetchTweets = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: 'elonmusk',
        excludeReplies: true,
        excludeRetweets: false,
        timeRange: '1d',
        maxTweets: '10',
        keyword: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFetchTweets = async (e) => {
        e.preventDefault();
        setLoading(true);

        let query = `from:${formData.username}`;
        if (formData.excludeReplies) query += ' -filter:replies';
        if (formData.excludeRetweets) query += ' -filter:retweets';
        if (formData.keyword) query += ` ${formData.keyword}`;

        const params = {
            query: query,
            within_time: formData.timeRange,
            max_results: formData.maxTweets
        };

        const data = await fetchTweets(params);
        setTweets(data || []);
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleFetchTweets} className={styles.form}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Twitter username"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    placeholder="Keyword (optional)"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="timeRange"
                    value={formData.timeRange}
                    onChange={handleInputChange}
                    placeholder="Time range (e.g., 1d, 6h, 30m)"
                    className={styles.input}
                />
                <input
                    type="number"
                    name="maxTweets"
                    value={formData.maxTweets}
                    onChange={handleInputChange}
                    placeholder="Max tweets to fetch"
                    className={styles.input}
                />
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="excludeReplies"
                        checked={formData.excludeReplies}
                        onChange={handleInputChange}
                    />
                    Exclude replies
                </label>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="excludeRetweets"
                        checked={formData.excludeRetweets}
                        onChange={handleInputChange}
                    />
                    Exclude retweets
                </label>
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Tweets'}
                </button>
            </form>
            <div className={styles.content}>
                {loading && <Skeleton />}
                {!loading && tweets.length > 0 && (
                    <div className={styles.tweetsContainer}>
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
};

const Skeleton = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
        </div>
    );
};

export default FetchTweets;