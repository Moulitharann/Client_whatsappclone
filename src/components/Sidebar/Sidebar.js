import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import { Avatar, IconButton } from '@mui/material';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import Sidebarchat from '../Sidebarchat/Sidebarchat';
import axios from 'axios';
import { useStateValue } from '../contextapi/Stateprovider';
import Pusher from 'pusher-js';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();  

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

  return (
    <div className='sidebar'> 
      <div className='sidebar__header'> 
        <Avatar src={user?.photoURL} />  
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined className='search' />
          <input placeholder='Search Or Chat' className='input' />
        </div>
      </div>
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
