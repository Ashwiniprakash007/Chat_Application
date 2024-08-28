import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Css/signup.css"

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8080/user/register', { name,email, password });
           
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert('Error during signup, please try again.');
        }
    };

    return (
        <div className='mainBox'>
            <h2>Signup</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;
