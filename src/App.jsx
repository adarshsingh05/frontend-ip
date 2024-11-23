import React, { useEffect, useState } from 'react';

export default function Home() {
    const [userIp, setUserIp] = useState('');
    const [visitorList, setVisitorList] = useState([]);

    // Fetch the user's IP address
    useEffect(() => {
        fetch('http://localhost:9000/api/ip')
            .then((res) => res.json())
            .then((data) => setUserIp(data.ip))
            .catch((err) => console.error('Error fetching IP:', err));
    }, []);

    // Fetch the list of visitor IPs
    const fetchVisitors = () => {
        fetch('http://localhost:9000/api/visitors')
            .then((res) => res.json())
            .then((data) => setVisitorList(data))
            .catch((err) => console.error('Error fetching visitors:', err));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>IP Tracker App</h1>
            <p>Your IP Address: <strong>{userIp}</strong></p>
            <button onClick={fetchVisitors}>Show Visitor List</button>

            <h2>Visitor IP Addresses</h2>
            <ul>
                {visitorList.map((visitor, index) => (
                    <li key={index}>
                        {visitor.ip} - {new Date(visitor.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
