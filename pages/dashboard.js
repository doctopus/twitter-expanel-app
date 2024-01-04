import React, { useState } from 'react';
import axios from 'axios';

const Tweets = () => {
    const [username, setUsername] = useState('');
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        try {
            const response = await axios.get(`/api/tweets?username=${username}`);
            setTweets(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Twitter username"
            />
            <button onClick={getTweets}>Get Tweets</button>

            <ul>
                {tweets.map((tweet) => (
                    <li key={tweet.id}>{tweet.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Tweets;
