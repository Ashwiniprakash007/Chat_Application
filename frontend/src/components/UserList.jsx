import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Css/UserList.css'; 

const UserList = ({ user }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user && user.token) {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/user/all', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });

                    const filteredUsers = response.data.filter(u =>
                        u.name && u.name.trim().toLowerCase() !== user.name.trim().toLowerCase()
                    );

                    setUsers(filteredUsers);
                } catch (error) {
                    alert('Error fetching users');
                }
            };

            fetchUsers();
        }
    }, [user]);

    if (!user || !user.name) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="user-list-container">
            <div className="logged-in-user">
                <span className="user-name">{user.name}</span>
                <span className="status-dot"></span>
            </div>
            <h2>All Users</h2>
            <ul>
                {users.map((u) => (
                    <li key={u._id}>
                        <Link to={`/messages/${u._id}`}>
                            {u.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;


























