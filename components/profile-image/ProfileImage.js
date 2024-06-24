// components/ProfileImage.js
import React, { useEffect } from 'react';
const ProfileImage = ({ imageUrl, alt }) => {
    useEffect(() => {
        // Add useEffect logic here if needed
    }, []);
    return (
        <img
            src={imageUrl}
            alt={alt}
            style={{ borderRadius: '50%', width: '50px', height: '50px' }} // Example styling
        />
    );
};

export default ProfileImage;
