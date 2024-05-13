import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducer, {initialState} from "./components/contextapi/reducer"
import {Stateprovider} from "./components/contextapi/Stateprovider"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Stateprovider initialState={initialState}  reducer={reducer}>
    <App />
    </Stateprovider>
  </React.StrictMode>
);

