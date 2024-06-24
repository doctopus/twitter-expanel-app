import { NextResponse } from 'next/server';
import { TwitterApi, EUploadMimeType } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { imagePath } = req.body;
    if (!imagePath) {
        return res.status(400).json({ error: 'Image path is required' });
    }

    const filePath = path.join(process.cwd(), 'public', imagePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'Image file does not exist' });
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
        return res.status(400).json({ error: 'Unsupported image format. Please use JPEG or PNG.' });
    }

    // Initialize Twitter client
    const twitterClient = new TwitterApi({
        appKey: process.env.X_API_KEY,
        appSecret: process.env.X_API_SECRET,
        accessToken: process.env.X_ACCESS_TOKEN,
        accessSecret: process.env.X_ACCESS_SECRET,
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

        res.status(200).json({ message: 'Twitter banner updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to update Twitter banner', details: error.message });
    }
}
