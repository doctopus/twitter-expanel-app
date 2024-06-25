"use client";
import GetTweetById from '../../components/GetTweetById/GetTweetById';
import FetchTweets from '../../components/FetchTweets/FetchTweets';
import TwitterData from '../../components/TwitterData/TwitterData';
import styles from "./page.module.scss";
import ProfileImage from "../../components/profile-image/ProfileImage";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    return(
        <div className={styles["home-container"]}>
            <section className={styles["intro-section"]}>
                <h2 className={styles["intro-heading"]}>Discover Our Latest Innovations</h2>
                <p className={styles["intro-text"]}>Scroll down to explore more about what we offer.</p>
            </section>

            <div className={styles["bento-grid"]}>
                <div className={styles["bento-item"]}>
                    <GetTweetById/>
                    <p className={styles["bento-text"]}>This is a description for item 1.</p>
                </div>
                <div className={styles["bento-item"]}>
                    {/*<div className={styles["bento-placeholder"]}>Placeholder Image</div>*/}
                    {status === 'authenticated' && session?.user?.image && (
                        <ProfileImage imageUrl={session.user.image} alt={session.user.name} size="large" />
                    )}
                    <TwitterData />
                    <p className={styles["bento-text"]}>User Details</p>
                </div>
                <div className={styles["bento-item"]}>
                    <FetchTweets/>
                    <p className={styles["bento-text"]}>Fetch Tweets of Any User</p>
                </div>
            </div>
        </div>
    );
}
