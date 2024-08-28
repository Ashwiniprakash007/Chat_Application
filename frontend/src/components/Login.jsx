import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/user/login', { name, password });
            const { userId, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', name);

            setUser({ userId, token , name });
            navigate('/users');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className='mainBox'>
            <h2>Login</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
