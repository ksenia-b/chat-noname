import React, {useContext, useState} from "react";
import { auth, db } from "../../firebase";
import * as uuid from 'uuid';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {AuthContext} from "../../auth/AuthContext.jsx";

const MessageForm = ({chatId}) => {
    const [message, setMessage] = useState("");
    const {currentUser, socket} = useContext(AuthContext)
    const sendMessage = async (event) => {
        event.preventDefault();
        console.log("send message here")
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }
        const __createdtime__ = Date.now();
        // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
        socket.emit('send_message', { user:currentUser, room:chatId, message, __createdtime__ });
        setMessage('');


    };

    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
            <label htmlFor="messageInput" hidden>
                Enter Message
            </label>
            <input
                placeholder='Message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageForm;