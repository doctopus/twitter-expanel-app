"use client"; // Ensure this component is a Client Component

import { useState } from 'react';
import axios from 'axios';

export default function UpdateUserImage({ imagePath, onUpload, className }) {
    const [status, setStatus] = useState('');

    const handleUpload = async () => {
        if (!imagePath) {
            setStatus('No image selected.');
            return;
        }

        try {
            setStatus('Uploading...');
            // Send POST request to the API route with the imagePath
            const response = await axios.post('/api/twitter/updateUserImage', { imagePath });

            // Set the status message based on the API response
            setStatus('Upload successful: ' + response.data.message);
            onUpload && onUpload(); // Call the onUpload callback if provided
        } catch (error) {
            console.error('Error uploading profile image:', error);
            if (error.response) {
                // Log and set the status message if there is a response error
                setStatus(`Failed to upload profile image. Server responded with status ${error.response.status}: ${error.response.data.error}`);
            } else {
                // Set the status message if there is a different error
                setStatus('Failed to upload profile image. Error: ' + error.message);
            }
        }
    };

    return (
        <>
            <button className={className} onClick={handleUpload}>
                Set as 𝕏 Profile Image
            </button>
            <p>{status}</p>
        </>
    );
}
