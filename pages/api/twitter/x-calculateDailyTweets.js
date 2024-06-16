// pages/api/twitter/calculateDailyTweets.js
import { countTweetsPerDay } from '../../../utils/x-dataAnalysis';
import axios from 'axios';

const API_URL = 'https://api.socialdata.tools/twitter/statuses/user_timeline';

export default async function handler(req, res) {
    const { username } = req.query;
    const token = process.env.TWITTER_BEARER_TOKEN;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const response = await axios.get(`${API_URL}?screen_name=${username}&count=100`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        const tweets = response.data;
        const tweetCounts = countTweetsPerDay(tweets);
        res.status(200).json(tweetCounts);
    } catch (error) {
        console.error('Error fetching tweets:', error.response.data);
        res.status(500).json({ error: 'Error fetching tweets' });
    }
}
