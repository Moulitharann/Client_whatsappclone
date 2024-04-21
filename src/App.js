import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Chat from './components/chat/Chat';
import {useStateValue} from "./components/contextapi/Stateprovider";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Sidebar from './components/Sidebar/Sidebar';

function App() {
 
  const [{user}]=useStateValue();


  return (
    <div className="App">
      {!user ?(
      <Login/>):(
        <div className='app__body'> 
      <BrowserRouter>
      <Sidebar/>
       <Routes> 
        <Route path='/' element={<Chat/>}/>
        <Route path='/rooms/:roomId' element={<Chat/>}/>
       </Routes>
      </BrowserRouter>
      </div>
   )   }
    </div>
  );
}

export default App;
