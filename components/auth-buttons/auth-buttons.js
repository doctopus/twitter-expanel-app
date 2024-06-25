'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './auth-buttons.module.scss';

const AuthButtons = () => {
    const { data: session } = useSession();

    return (
        <div>
            {!session && (
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => signIn('twitter')}>Sign in with Twitter</button>
                </div>
            )}
            {session && (
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => signOut()}>Sign out</button>
                </div>
            )}
        </div>
    );
};

export default AuthButtons;
