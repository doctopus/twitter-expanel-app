// app/api/twitter/updateUserBanner/route.js
import { getToken } from "next-auth/jwt";
import { TwitterApi, EUploadMimeType } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request) {
    const token = await getToken({ req: request, secret });

    if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { imagePath } = await request.json();
    if (!imagePath) {
        return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', imagePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'Image file does not exist' }, { status: 400 });
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(filePath);

    // Determine MIME type based on file extension
    const mimeType = imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')
        ? EUploadMimeType.Jpeg
        : imagePath.endsWith('.png')
            ? EUploadMimeType.Png
            : null;

    if (!mimeType) {
        return NextResponse.json({ error: 'Unsupported image format. Please use JPEG or PNG.' }, { status: 400 });
    }

    // Initialize Twitter client with user's tokens
    const twitterClient = new TwitterApi({
        appKey: process.env.X_API_KEY,
        appSecret: process.env.X_API_SECRET,
        accessToken: token.oauth_token,
        accessSecret: token.oauth_token_secret,
    });

    try {
        // Upload the image to Twitter
        const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, { mimeType });

        // If mediaId is returned as an object, extract the media_id_string
        const bannerMediaId = typeof mediaId === 'object' && mediaId.media_id_string
            ? mediaId.media_id_string
            : mediaId;

        if (!bannerMediaId) {
            throw new Error('Invalid media ID returned');
        }

        // Update the profile banner
        await twitterClient.v1.post('account/update_profile_banner.json', {
            media_id: bannerMediaId,
        });

        return NextResponse.json({ message: 'Twitter banner updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to update Twitter banner', details: error.message },
            { status: 500 }
        );
    }
}
