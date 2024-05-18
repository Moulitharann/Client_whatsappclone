import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import Sidebarchat from '../Sidebarchat/Sidebarchat';
import axios from 'axios';
import { useStateValue } from '../contextapi/Stateprovider';
import Pusher from 'pusher-js';

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user }] = useStateValue();  
    const [isOpen, setIsOpen] = useState(false); // Initialize isOpen to false initially

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_Backend_url}/all/rooms`);
                setRooms(response.data.data); 
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            }
        };

        fetchRooms();
    }, []);  

    useEffect(() => {
        const pusher = new Pusher('1212a6ec6365f5251d2b', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('room');
        channel.bind('inserted', function(room) {
            setRooms(prevRooms => [...prevRooms, room]);
        });
    }, []);

    setIsOpen(!isOpen); 
    
    const logout = (event) => {
        event.stopPropagation(); 
        localStorage.setItem("user", null);
        window.location.reload();
      };
           
        
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className='sidebar__header'> 
                <Avatar src={user?.photoURL} />
                {/* Button to toggle sidebar on mobile */}
                
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    
                                    <div className='icondropdown'>
                    <IconButton className='container'>
                        <MoreVert />
                    </IconButton>
                    <div className='dropdown'>
                        <button onClick={(e)=>{logout(e)}}>Logout</button>
                    </div>
                    </div>
                    
                </div>
            </div>
            {/* Sidebar search */}
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined className='search' />
                    <input placeholder='Search Or Chat' className='input' />
                </div>
            </div>
            {/* Sidebar chats */}
            <div className='sidebar__chats'>
                <Sidebarchat addnewchat />
                {rooms.map(room => (
                    <Sidebarchat key={room._id} id={room._id} name={room.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
