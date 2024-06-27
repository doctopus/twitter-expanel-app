"use client"; // Ensure this component is a Client Component

import { useState } from 'react';
import axios from 'axios';

export default function UpdateUserProfile({ className }) {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        location: '',
        description: '',
        include_entities: false,
        skip_status: false,
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setStatus('Updating...');
            // Send POST request to the API route with the form data
            const response = await axios.post('/api/twitter/updateUserProfile', formData);

            // Set the status message based on the API response
            setStatus('Update successful: ' + response.data.message);
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response) {
                // Log and set the status message if there is a response error
                setStatus(`Failed to update profile. Server responded with status ${error.response.status}: ${error.response.data.error}`);
            } else {
                // Set the status message if there is a different error
                setStatus('Failed to update profile. Error: ' + error.message);
            }
        }
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="url"
                name="url"
                placeholder="URL"
                value={formData.url}
                onChange={handleChange}
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <label>
                <input
                    type="checkbox"
                    name="include_entities"
                    checked={formData.include_entities}
                    onChange={handleChange}
                />
                Include Entities
            </label>
            <label>
                <input
                    type="checkbox"
                    name="skip_status"
                    checked={formData.skip_status}
                    onChange={handleChange}
                />
                Skip Status
            </label>
            <button type="submit">Update Profile</button>
            <p>{status}</p>
        </form>
    );
}
