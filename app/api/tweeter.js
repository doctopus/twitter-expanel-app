import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/route";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const accessToken = session.user.accessToken;

    const response = await fetch("https://api.twitter.com/2/users/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}