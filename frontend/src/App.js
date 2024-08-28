// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Message from './components/Message';
import UserList from './components/UserList'; // Import the new UserList component
import axios from 'axios';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Restore user state from localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            setUser({ token, userId });
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                {/* {user && (
                    <Route path="/messages" element={<Message user={user} />} />
                )}
                {user && (
                    <Route path="/users" element={<UserList user={user} />} />
                )} */}

{user && (
                    <Route path="/users" element={<UserList user={user} />} />
                )}
                {user && (
                    <Route path="/messages/:recipientId" element={<Message user={user} />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
