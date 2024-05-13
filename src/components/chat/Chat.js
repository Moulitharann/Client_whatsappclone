import React, { useEffect, useState ,useRef} from 'react';
import "./chat.css";
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useStateValue } from '../contextapi/Stateprovider';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';

const Chat = () => {
    const { roomId } = useParams(); // Correct placement of useParams
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();
    const [roomName, setRoomName] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);


    const chatBodyRef = useRef(null);

    useEffect(() => {
        
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        const pusher = new Pusher('1212a6ec6365f5251d2b', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('message');
        const handleMessage = (msg) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        };
        channel.bind('inserted', handleMessage);

        return () => {
            channel.unbind('inserted', handleMessage);
            pusher.unsubscribe('message');
        };
    }, []);

    useEffect(() => {
        if (roomId) {
            setError(null);
            axios.get(`https://whatsappclone-ykcz.onrender.com/room/${roomId}`)
                .then((response) => {
                    if (response.data && response.data.data) {
                        setRoomName(response.data.data.name);
                        setUpdatedAt(response.data.data.updatedAt);
                    } else {
                        console.log("No room data available");
                        setError("No data available");
                    }
                })
                .catch(error => {
                    console.error("Error fetching room data:", error);
                    setError("Failed to fetch room data");
                });

            axios.get(`${process.env.REACT_APP_Backend_url}/messages/${roomId}`)
                .then((response) => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                    setError("Failed to fetch messages");
                });
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!input) {
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_Backend_url}/Message/new`, {
                Message: input,
                name: user.displayName,
                timestamps: new Date(),
                uid: user.uid,
                roomId: roomId,
            });
            setInput("");
        } catch (error) {
            console.error("Error submitting message:", error);
            setError("Failed to send message");
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat__header__info'>
                    <h3>{roomName || "Welcome to WhatsApp"}</h3>
                    <p>{updatedAt ? `Last seen ${new Date(updatedAt).toISOString()}` : "Click any group"}</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div ref={chatBodyRef}  className='chat__body'>
                {messages.map((message, index) => (
                    <p key={index} className={`chat__message ${message.uid === user.uid && 'chat__recevier'}`}>
                        <span className='chatname'>{message.name}</span>
                       
                        {message.Message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamps).toUTCString()}
                        </span>
                    </p>  
                ))}
            </div>  

            {roomName &&  <div className='chat__footer'>
                <InsertEmoticon />
                <form onSubmit={submit}>
                    <input type='text' placeholder='Type a message' onChange={e => setInput(e.target.value)} value={input} />
                    <button type="submit">Send a message</button>
                </form>
            </div>}
        </div>
    );
};

export default Chat;
