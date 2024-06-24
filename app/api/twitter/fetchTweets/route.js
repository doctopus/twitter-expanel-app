import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const within_time = searchParams.get('within_time');
    const apiKey = process.env.SOCIALDATA_API_KEY;

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
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

        return NextResponse.json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error.response ? error.response.data : error.message);
        return NextResponse.json(
            { error: 'Error fetching tweets', details: error.response ? error.response.data : error.message },
            { status: 500 }
        );
    }
}