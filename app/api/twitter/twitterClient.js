export async function getUserProfile(accessToken) {
    const response = await fetch('/api/twitter?endpoint=users/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
}

export async function getTweets(accessToken) {
    const response = await fetch('/api/twitter?endpoint=tweets/search/recent?query=from:SpiritChirag', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch tweets');
    return response.json();
}