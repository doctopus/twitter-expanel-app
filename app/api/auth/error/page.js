'use client';

import Link from 'next/link';

const AuthError = () => {
    return (
        <div className="auth-error-container">
            <h1>Authentication Error</h1>
            <p>An error occurred during the authentication process.</p>
            <Link href="/">
                <button>Return to Home</button>
            </Link>
            <style jsx>{`
        .auth-error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        h1 {
          color: #ff4444;
        }
        p {
          margin: 20px 0;
        }
        button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0051a2;
        }
      `}</style>
        </div>
    );
};

export default AuthError;