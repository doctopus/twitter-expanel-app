// pages/api/twitter/fetchTweetsByUsername.js
import axios from 'axios';

export default async function handler(req, res) {
    const { username } = req.query;
    const apiKey = process.env.SocialData_API_TOKEN;

    console.log('API Key:', apiKey); // Ensure API key is being loaded

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const response = await axios.get(`https://api.socialdata.tools/twitter/user_timeline`, {
            params: {
                screen_name: username,
                count: 1
            },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const tweets = response.data;
        console.log('Fetched Tweet:', tweets[0]); // Log the fetched tweet

        res.status(200).json(tweets[0]); // Return the most recent tweet
    } catch (error) {
        console.error('Error fetching tweets:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching tweets', details: error.response ? error.response.data : error.message });
    }
}
