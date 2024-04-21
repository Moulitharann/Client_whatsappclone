import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAMePQyKNC-b3ykQWKrrqiBijZEstBNMvc",
    authDomain: "whatsapp-clone-2995b.firebaseapp.com",
    projectId: "whatsapp-clone-2995b",
    storageBucket: "whatsapp-clone-2995b.appspot.com",
    messagingSenderId: "597664426152",
    appId: "1:597664426152:web:36ff011976c0023c54fa9d",
    measurementId: "G-HS9QCVZYPT"
  };

const app=initializeApp(firebaseConfig);
 
const auth=getAuth();
const provider=new GoogleAuthProvider()

export{app,auth,provider}