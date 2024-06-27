//app/xprofile/page.js
"use client"; // Ensure this component is a Client Component

import { useState } from 'react';
import UpdateBanner from '../../components/UpdateBanner/UpdateBanner';
import UpdateUserBanner from "../../components/UpdateUserBanner/UpdateUserBanner";
import UpdateUserImage from "../../components/UpdateUserImage/UpdateUserImage";
import UpdateUserProfile from '../../components/UpdateUserProfile/UpdateUserProfile';
// import Image from 'next/image';
import './styles.css';


export default function XProfile() {
    const [profile, setProfile] = useState(null);
    // const handleProfileUpdate = (data) => {
    //     setProfile(data);
    // };
    const [imagePath, setImagePath] = useState('/images/default-banner.png'); // Default banner image path
    const handleImageUpdate = (newImagePath) => {
        setImagePath(newImagePath);
    };

    const handleBannerUpdate = (data) => {
        setProfile(data);
    };
    const handleUploadSuccess = () => {
        // Perform any actions needed after a successful upload
        console.log('Banner updated successfully.');
    };

    const [userImagePath, setUserImagePath] = useState('/images/profile-image-cola.png');
    // const handleUserImageUpdate = (newUserImagePath) => {
    //     setUserImagePath(newUserImagePath);
    // };
    const handleProfileUpdate = (data) => {
        setProfile(data);
    };

    return (
        <div className="xprofile-container">
            <h1>𝕏Profile</h1>
            <p>Update your 𝕏 profile banner image and information</p>

            <div className="banner-frame">
                <img src={imagePath} alt="Profile Banner" className="banner-image"/>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => handleImageUpdate('/images/updated-banner.jpg')}>
                    Update Banner
                </button>
                <UpdateUserBanner
                    imagePath={imagePath}
                    onUpload={handleBannerUpdate}
                    className="your-button-class"
                />
                {profile && (
                    <div>
                        <h2>Updated Profile</h2>
                        <p>Banner updated successfully</p>
                    </div>
                )}
                <p />
                <UpdateBanner
                    imagePath={imagePath}
                    onUpload={handleUploadSuccess}
                    className="button"
                    onImageUpdate={handleImageUpdate}
                />
            </div>

            {/* Add the UpdateUserImage component */}
            <div className="profile-container">
                <div className="banner-frame">
                    <img src={userImagePath} alt="User Image" className="banner-image" />
                </div>
                <div className="button-container">
                    <button className="button" onClick={() => setUserImagePath('/images/profile-image-giraffe.jpg')}>
                        Update User Image
                    </button>
                    <UpdateUserImage
                        imagePath={userImagePath}
                        // onUpload={handleUserImageUpdate}
                        className="your-button-class"
                        onUserImageUpdate={setUserImagePath}
                        />
                    {profile && (
                        <div>
                            <h2>Updated Profile</h2>
                            <p>Profile image updated successfully</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="profile-container">
                <UpdateUserProfile onUpload={handleProfileUpdate} />
                {profile && (
                    <div>
                        <h2>Updated Profile</h2>
                        <p>Profile updated successfully</p>
                    </div>
                )}
            </div>
        </div>
    );
}