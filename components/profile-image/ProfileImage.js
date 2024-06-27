// components/ProfileImage.js
import React from 'react';
import Image from 'next/image';
import styles from './ProfileImage.module.scss';

const ProfileImage = ({ imageUrl, alt, size }) => {
    if (!imageUrl) return null; // Return null if no image URL is provided

    let width, height;
    switch (size) {
        case 'large':
            width = 128;
            height = 128;
            break;
        default:
            width = 64;
            height = 64;
            break;
    }

    return (
        <Image
            src={imageUrl}
            alt={alt || 'Profile'}
            width={width}
            height={height}
            className={size === 'large' ? styles.profileImageLarge : styles.profileImage}
        />
    );
};

export default ProfileImage;