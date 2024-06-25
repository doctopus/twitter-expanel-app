// components/ProfileImage.js
import React from 'react';
import styles from './ProfileImage.module.scss';

const ProfileImage = ({ imageUrl, alt, size }) => {
    if (!imageUrl) return null; // Return null if no image URL is provided

    const imageSizeClass = size === 'large' ? styles.profileImageLarge : styles.profileImage;

    return (
        <img
            src={imageUrl}
            alt={alt || 'Profile'}
            className={imageSizeClass}
        />
    );
};

export default ProfileImage;