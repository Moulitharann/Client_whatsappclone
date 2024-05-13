import React, { useEffect, useState } from 'react'
import "./sidebarchat.css"
import { Avatar } from '@mui/material'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Sidebarchat = ({addnewchat,name,id}) => {
    const [seed,setseed]=useState();
    useEffect(()=>{
   setseed(Math.floor(Math.random()*5000));
    },[])
    

    const create=async()=>{
      const roomName=prompt("enter Your group name");
      if(roomName)
      {
        try{
          await axios.post(`${process.env.Backend_url}/groups/create`,{
        groupname:roomName,});
        
        }
        catch(error)
        {
          console.log(error)
        }
      }
    }
  return !addnewchat ?(
    <Link to={`/rooms/${id}`}>
    <div className='sidebarchat'>
      <Avatar 
      src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
      />
      <div className='sidebarchat__info'>
        <h2>{name}</h2>
      </div>
    </div></Link>
  ):(
    <div className='sidebarchat' onClick={create}>Add new chat</div>
  )
}

export default Sidebarchat
 