'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {
    const { data: session } = useSession();

    return (
        <div>
            {!session && (
                <>
                    <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
                </>
            )}
            {session && (
                <>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </div>
    );
};

export default AuthButtons;
