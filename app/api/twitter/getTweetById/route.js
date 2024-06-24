import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const apiKey = process.env.SOCIALDATA_API_KEY;

    if (!id) {
        return NextResponse.json({ error: 'Tweet ID is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(`https://api.socialdata.tools/twitter/statuses/show`, {
            params: { id },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching tweet:', error.response ? error.response.data : error.message);
        return NextResponse.json(
            { error: 'Error fetching tweet', details: error.response ? error.response.data : error.message },
            { status: 500 }
        );
    }
}