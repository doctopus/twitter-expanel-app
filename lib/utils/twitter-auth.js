// To Generate Header for Posting Tweet
const crypto = require('crypto');

export function generateAuthorizationHeader(apiKey, apiSecret, oauthToken, oauthTokenSecret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomBytes(16).toString('hex');
    const signatureBase = `POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Faccount%2Fupdate_profile.json&oauth_consumer_key%3D${apiKey}%26oauth_nonce%3D${nonce}%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D${timestamp}%26oauth_token%3D${oauthToken}%26oauth_version%3D1.0`;
    const signingKey = `${apiSecret}&${oauthTokenSecret}`;
    const signature = crypto.createHmac('sha1', signingKey).update(signatureBase).digest('base64');

    const authorizationHeader = `OAuth oauth_consumer_key="${apiKey}",oauth_token="${oauthToken}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${encodeURIComponent(signature)}"`;

    return authorizationHeader;
}