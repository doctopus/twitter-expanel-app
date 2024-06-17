"use client"; // Ensure this component is a Client Component

import { useState } from 'react';
import UpdateBanner from '../../components/UpdateBanner';
import './styles.css'; // Ensure this file contains your CSS for styling

export default function XProfile() {
    const [imagePath, setImagePath] = useState('/images/default-banner.png'); // Default banner image path

    const handleImageUpdate = (newImagePath) => {
        setImagePath(newImagePath);
    };

    const handleUploadSuccess = () => {
        // Perform any actions needed after a successful upload
        console.log('Banner updated successfully.');
    };

    return (
        <div className="xprofile-container">
            <h1>𝕏Profile</h1>
            <p>Update your 𝕏 profile banner image</p>

            <div className="banner-frame">
                <img src={imagePath} alt="Profile Banner" className="banner-image"/>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => handleImageUpdate('/images/updated-banner.png')}>
                    Update Image
                </button>
                <button className="button" onClick={() => alert('Image logic not implemented yet')}>
                    Change Image Logic
                </button>
                <UpdateBanner imagePath={imagePath} onUpload={handleUploadSuccess} className="button" />
            </div>

        </div>
    );
}
