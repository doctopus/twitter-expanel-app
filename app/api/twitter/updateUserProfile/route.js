import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request) {
    const token = await getToken({ req: request, secret });

    if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { name, url, location, description, include_entities, skip_status } = await request.json();
    const params = {
        name,
        url,
        location,
        description,
        include_entities,
        skip_status,
    };

    // Remove undefined params
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

    // Initialize Twitter client with user's tokens
    const twitterClient = new TwitterApi({
        appKey: process.env.X_API_KEY,
        appSecret: process.env.X_API_SECRET,
        accessToken: token.oauth_token,
        accessSecret: token.oauth_token_secret,
    });

    try {
        // Update the profile
        const response = await twitterClient.v1.post('account/update_profile.json', params);
        return NextResponse.json({ message: 'Twitter profile updated successfully', response });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to update Twitter profile', details: error.message },
            { status: 500 }
        );
    }
}
