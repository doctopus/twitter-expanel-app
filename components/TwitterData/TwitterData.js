"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { getUserProfile } from '../../lib/api';
import styles from './TwitterData.module.scss';

export default function TwitterData() {
    const { data: session, status } = useSession();
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [fetchingData, setFetchingData] = useState(false);

    useEffect(() => {
        // Only fetch data when fetchingData is true
        if (fetchingData && status === 'authenticated' && session?.accessToken) {
            fetchData();
        }
    }, [fetchingData, status, session]);

    async function fetchData() {
        try {
            console.log('Fetching user profile...');
            const profile = await getUserProfile(session.accessToken);
            console.log('User profile:', profile);
            setUserProfile(profile);
            setFetchingData(false);  // Reset fetching state after successful fetch
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Error fetching data from Twitter');
        }
    }

    function handleFetchClick() {
        setFetchingData(true);  // Set fetching state to true to trigger fetch
    }

    if (status === 'loading') return <div className={styles.loadingContainer}><p>Loading...</p></div>;
    if (error) return <div className={`${styles.errorContainer} ${styles.pulseAnimation}`}>Error: {error}</div>;

    return (
        <div className={styles.twitterData}>
            <h2>Twitter Data</h2>
            {userProfile && userProfile.data && (  // Ensure userProfile.data exists before accessing its properties
                <div className={styles.userProfile}>
                    <h3>User Profile</h3>
                    <div className={styles.profileInfo}>
                        <p>Name: {userProfile.data.name}</p>
                        <p>Username: {userProfile.data.username}</p>
                    </div>
                </div>
            )}
            <button onClick={handleFetchClick} className={styles.button} disabled={fetchingData}>
                {fetchingData ? 'Fetching Data...' : 'Fetch Twitter Data'}
            </button>
        </div>
    );
}
