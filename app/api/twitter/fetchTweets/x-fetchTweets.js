// pages/api/twitter/fetchTweets.js
import axios from 'axios';

export default async function handler(req, res) {
    const { query, within_time } = req.query; // Extract query parameters
    const apiKey = process.env.SOCIALDATA_API_KEY;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Construct the request URL
        let requestUrl = `https://api.socialdata.tools/twitter/search?query=${encodeURIComponent(query)}`;
        if (within_time) {
            requestUrl += `&within_time=${within_time}`;
        }

        // Fetch the data from SocialData.tools
        const response = await axios.get(requestUrl, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Extract the relevant data
        const tweets = response.data.tweets.map(tweet => ({
            tweet_created_at: tweet.tweet_created_at,
            full_text: tweet.full_text,
        }));

        res.status(200).json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching tweets', details: error.response ? error.response.data : error.message });
    }
}
