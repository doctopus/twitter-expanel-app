import axios from 'axios';

export default async function handler(req, res) {
    const { username } = req.query;
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    try {
        const response = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=from:${username}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.respnse?.status || 500).json(error.message);
    }
}