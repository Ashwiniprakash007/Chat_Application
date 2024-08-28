import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Css/message.css';

const Message = ({ user }) => {
    const { recipientId } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/message/get/${recipientId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                
                const updatedMessages = response.data.map(msg => ({
                    ...msg,
                    senderName: msg.senderName || 'Unknown Sender' 
                }));
                
                setMessages(updatedMessages);
            } catch (error) {
                alert('Error fetching messages');
            }
        };

        fetchMessages();

        const eventSource = new EventSource(`http://localhost:8080/message/events/${user.userId}`);
        eventSource.onmessage = function(event) {
            const newMessage = JSON.parse(event.data);

            if (newMessage.recipientId === user.userId || newMessage.senderId === user.userId) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { ...newMessage, senderName: newMessage.senderName || 'Unknown Sender' }
                ]);
            }
        };

        return () => {
            eventSource.close();
        };
    }, [recipientId, user.token, user.userId]);

    const sendMessage = async () => {
        try {
            await axios.post('http://localhost:8080/message/send', {
                senderId: user.userId,
                recipientId,
                content
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
    
            setMessages(prevMessages => [
                ...prevMessages,
                { senderId: user.userId, recipientId, content, senderName: user.name }
            ]);
    
            setContent('');
        } catch (error) {
            console.error('Error sending message:', error); 
            alert('Error sending message');
        }
    };

    return (
        <div className="message-container">
            <h2>Messages</h2>
            <div className="message-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.senderId === user.userId ? 'message sender' : 'message receiver'}>
                        {msg.content} <span>({msg.senderName})</span>
                    </p>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="message-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
};

export default Message;

