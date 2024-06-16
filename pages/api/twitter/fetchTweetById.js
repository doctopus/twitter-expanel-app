// pages/api/twitter/fetchTweetById.js
import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query;
    const apiKey = process.env.SocialData_API_TOKEN;

    if (!id) {
        return res.status(400).json({ error: 'Tweet ID is required' });
    }

    try {
        const response = await axios.get(`https://api.socialdata.tools/twitter/statuses/show`, {
            params: { id },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching tweet:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching tweet', details: error.response ? error.response.data : error.message });
    }
}
