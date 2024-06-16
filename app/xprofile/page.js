"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import './styles.css';

export default function XProfile() {
    const [imageSrc, setImageSrc] = useState('/images/default-banner.png'); // Path to the default image

    return (
        <div style={{ padding: '20px', fontFamily: 'Roboto, sans-serif' }}>
            <h1>𝕏Profile</h1>
            <p>Here you can update your 𝕏 profile banner image.</p>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ border: '2px solid #F6F6F7', padding: '10px', borderRadius: '8px', overflow: 'hidden', width: '750px', height: '250px', margin: '0 auto' }}>
                    <img src={imageSrc} alt="Profile Banner" style={{ width: '100%', height: 'auto' }} />
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button className="button" onClick={() => setImageSrc('/images/default-banner.png')}>
                    Default Image
                </button>
                <button className="button" onClick={() => alert('Image logic not implemented yet')}>
                    Change Image Logic
                </button>
                <button className="button" onClick={() => alert('Upload to 𝕏 logic not implemented yet')}>
                    Set as 𝕏 Banner
                </button>
            </div>
        </div>
    );
}
//style={buttonStyle}
// const buttonStyle = {
//     margin: '10px',
//     padding: '10px 20px',
//     background: '#007DEF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '1rem',
// };
const buttonStyle = {
    borderRadius: "2rem",
    backgroundImage: "linear-gradient(180deg, #34A8F7 0%, #0B8CE4 100%)",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.15)",
    color: "#fff",
    display: "inline-block",
    padding: "0.875em 1.2em",
    fontSize: "1.11em",
    backgroundColor: "#E7E7E7",
    /*borderRadius: "20px",*/
    /*padding: "0.75rem 1rem",*/
    lineHeight: "1rem",
    /*color: "var(--color-grey)",*/
    userSelect: "none",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s",
    margin: "2px 8px",
    /*paddingBlock: "1px",
    paddingInline: "6px",*/
    /*borderWidth: "2px",
    borderStyle: "outset",
    borderColor: "#E7E7E7",*/
    border: "none",
    borderImage: "initial",
    opacity: 90,
    WebkitTransition: "opacity .25s ease",
    MozTransition: "opacity .25s ease"
}