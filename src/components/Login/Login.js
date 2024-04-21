import React from 'react'
import { Button} from '@mui/material'
import {auth,provider} from "../../firebase"
import {signInWithPopup} from 'firebase/auth'
import {} from "./Login.css"
import  {useStateValue} from "../contextapi/Stateprovider"
import  {actionTypes} from "../contextapi/reducer"


const Login = () => {
 
  const [state,dispatch]=useStateValue();
 
  const signin=()=>{
    signInWithPopup(auth,provider)  
    .then((result)=>{
       dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
       })
      
    }).catch((err)=>{
        alert("No Internet ")
        console.log(err.result)
    })
  }


  return (
    <div className='login'> 
      <div className='login__container'>
           <img
           src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
           alt='logo'
           />
           <div className='login__text'>
            <h1>Sign to Whatsapp</h1>
            <Button onClick={signin}>
                Sign with Google
            </Button>
           </div>
      </div>
    </div>  
  )
}

export default Login
