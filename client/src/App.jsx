import React, {useState, useEffect} from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout";
import ChatDetails from "./pages/ChatDetails.tsx";
import Chats from "./pages/Chats.tsx";
import {
    Routes,
    Route
} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from './auth/AuthContext';
import {auth} from './firebase.js';
import {onAuthStateChanged} from 'firebase/auth';
import io from "socket.io-client";

const socket = io.connect('http://localhost:4000'); // Add this -- our server will run on port 4000, so we connect to it from here

function App() {

    const [currentUser, setCurrentUser] = useState(null)
    // const [username, setUsername] = useState(''); // Add this

    useEffect(() => {
        let userData = {}
        onAuthStateChanged(auth, (user) => {
            console.log("User = ", user)
            userData = {
                uid: user.uid,
                email: user.email,
                displayName: user?.displayName,
                photoURL: user?.photoURL
            }
            setCurrentUser(userData)
        })
    }, [])

    console.log('current user---', currentUser)
    return (
        <AuthProvider value={{currentUser, socket}}>
            <Router>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<Signup/>}/>


                        <Route
                            path="chats"
                            element={<Chats
                            />}
                        >
                            <Route path=":chatId" element={<ChatDetails/>}/>

                        </Route>
                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
