import React, { useEffect, useState } from 'react';

export default function Home() {
    const [userIp, setUserIp] = useState('Loading...');
    const [visitorList, setVisitorList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch the user's IP address on component mount
    useEffect(() => {
        fetch('https://backend-ip.vercel.app/api/ip')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch IP address');
                }
                return res.json();
            })
            .then((data) => setUserIp(data.ip))
            .catch((err) => {
                console.error('Error fetching IP:', err);
                setUserIp('Error fetching IP');
                setErrorMessage('Could not retrieve your IP address. Please try again later.');
            });
    }, []);

    // Fetch the list of visitor IPs
    const fetchVisitors = () => {
        setErrorMessage(''); // Reset any previous errors
        fetch('https://backend-ip.vercel.app/api/visitors')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch visitor data');
                }
                return res.json();
            })
            .then((data) => setVisitorList(data))
            .catch((err) => {
                console.error('Error fetching visitors:', err);
                setErrorMessage('Could not retrieve the visitor list. Please try again later.');
            });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>IP Tracker App</h1>

            {errorMessage && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
            )}

            <p>Your IP Address: <strong>{userIp}</strong></p>
            <button onClick={fetchVisitors} style={{ margin: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                Show Visitor List
            </button>

            <h2>Visitor IP Addresses</h2>
            {visitorList.length > 0 ? (
                <ul>
                    {visitorList.map((visitor, index) => (
                        <li key={index}>
                            {visitor.ip} - {new Date(visitor.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No visitors logged yet. Click the button above to fetch data.</p>
            )}
        </div>
    );
}
