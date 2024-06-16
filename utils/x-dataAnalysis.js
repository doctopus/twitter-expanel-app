// utils/dataAnalysis.js

export const countTweetsPerDay = (tweets) => {
    const tweetCounts = {};

    tweets.forEach(tweet => {
        const date = new Date(tweet.created_at).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        if (tweetCounts[date]) {
            tweetCounts[date] += 1;
        } else {
            tweetCounts[date] = 1;
        }
    });

    return tweetCounts;
};
