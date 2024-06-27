// app/api/auth/[...nextauth]route.js

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
    providers: [
        TwitterProvider({
            clientId: process.env.X_API_KEY,
            clientSecret: process.env.X_API_SECRET,
            version: "1.0a",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.oauth_token = account.oauth_token;
                token.oauth_token_secret = account.oauth_token_secret;
            }
            return token;
        },
        async session({ session, token }) {
            session.oauth_token = token.oauth_token;
            session.oauth_token_secret = token.oauth_token_secret;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };