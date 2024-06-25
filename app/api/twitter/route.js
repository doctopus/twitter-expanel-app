import { NextResponse } from "next/server";
import axios from 'axios';

const twitterApi = axios.create({
    baseURL: 'https://api.twitter.com/2',
});

export async function GET(request) {
    console.log('Twitter API route called');
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];

    if (!accessToken) {
        console.log('No access token found in request');
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
        return NextResponse.json({ error: 'No endpoint specified' }, { status: 400 });
    }

    try {
        console.log('Making request to Twitter API');
        const response = await twitterApi.get(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('Twitter API response:', response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Twitter API error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: 'Error fetching data from Twitter' },
            { status: error.response?.status || 500 }
        );
    }
}