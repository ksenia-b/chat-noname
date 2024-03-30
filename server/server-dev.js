import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";
const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat chat
let chatRoomUsers = {};
import * as uuid from 'uuid';

const app = express();

app.use(cors()); // Add cors middleware

const chatServer = http.createServer(app);
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(chatServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // join the chat
    socket.on('join_room', (data) => {
        // const {username, room} = data; // Data sent from client when join_room event emitted
        const { message, username, room, __createdtime__ } = data;
        socket.join(room); // Join the user to a socket room

        // Add this
        // let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });

        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Save the new user to the room
        chatRoom = room;
        allUsers.push({id: socket.id, username, room});
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);


        // socket.on('send_message', (data) => {
        //     // const { message, username, room, __createdtime__ } = data;
        //    const { username, room, message, __createdtime__ } = data;
        //     console.log("send_message, message =",message, "")
        //     io.in(room).emit('receive_message', data); // Send to all users in room, including sender
            // harperSaveMessage(message, username, room, __createdtime__) // Save message in db
            //     .then((response) => console.log(response))
            //     .catch((err) => console.log(err));
            // const { uid, email, photoURL } = auth.currentUser;
            // addDoc(collection(db, "messages"), {
            //     text: message,
            //     userUid: uid,
            //     userName: email,
            //     avatar: photoURL,
            //     createdAt: serverTimestamp(),
            //     chatId: chatId,
            //     uid: uuid.v4(),
            // });
            // setMessage("");
        // });
    });

    socket.on('send_message', (data) => {
        console.log('send_message =>', data)
        const { message, user, room, __createdtime__ } = data;
        io.in(room).emit('receive_message', data); // Send to all users in room, including sender

        addDoc(collection(db, "messages"), {
            text: message,
            userUid: user.uid,
            userName: user.email,
            avatar: user.photoURL,
            createdAt: serverTimestamp(),
            chatId: room,
            uid: uuid.v4(),
        });

    //     harperSaveMessage(message, username, room, __createdtime__) // Save message in db
    //         .then((response) => console.log(response))
    //         .catch((err) => console.log(err));
    });

});

app.get('/', (req, res) => {
    res.send('Hello world');
});

chatServer.listen(4000, () => console.log('Server is running on port 4000'));
