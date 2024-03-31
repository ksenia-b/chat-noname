// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "./firebase.js";
// const CHAT_BOT = 'ChatBot';
// let chatRoom = ''; // E.g. javascript, node,...
// let allUsers = []; // All users in current chat chat
// let chatRoomUsers = {};
// import * as uuid from 'uuid';
// import {firebaseGetMessages} from "./src/services/firebase-get-messages.js"
//
// const app = express();
//
// app.use(cors()); // Add cors middleware
//
// const chatServer = http.createServer(app);
// // Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
// const io = new Server(chatServer, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//     },
// });
//
// // Listen for when the client connects via socket.io-client
// io.on('connection', (socket) => {
//     console.log(`User connected ${socket.id}`);
//
//     // join the chat
//     socket.on('join_room', (data) => {
//         // Save the new user to the room
//         const { message, username, room, __createdtime__ } = data;
//         chatRoom = room;
//         allUsers.push({ id: socket.id, username, room });
//         chatRoomUsers = allUsers.filter((user) => user.room === room);
//         socket.to(room).emit('chatroom_users', chatRoomUsers);
//         socket.emit('chatroom_users', chatRoomUsers);
//         socket.join(room); // Join the user to a socket room
//
//         // const {username, room} = data; // Data sent from client when join_room event emitted
//         // let __createdtime__ = Date.now(); // Current timestamp
//         // Send message to all users currently in the room, apart from the user that just joined
//         socket.to(room).emit('receive_message', {
//             message: message,
//             userName: 'CHAT_BOT',
//             avatar: '',
//             createdAt: serverTimestamp(),
//             chatId: room,
//             uid: '',
//             __createdtime__
//             // message: `${username} has joined the chat room`,
//             // username: CHAT_BOT,
//             // __createdtime__
//
//         });
//
//         socket.emit('receive_message', {
//             message: `Welcome ${username}`,
//             userName: 'CHAT_BOT',
//             avatar: '',
//             createdAt: serverTimestamp(),
//             chatId: room,
//             uid: '',
//             __createdtime__
//             // message: `Welcome ${username}`,
//             // username: CHAT_BOT,
//             // __createdtime__,
//             // text: `Welcome ${username}`,
//
//         });
//
//         // get messages
//         // Get last 10 messages sent in the chat room
//         firebaseGetMessages(room).then((last10Messages) => {
//                 console.log('latest messages');
//                 socket.emit('last_10_messages', last10Messages);
//             }).catch((err) => console.log(err));
//     });
//         // socket.on('send_message', (data) => {
//         //     // const { message, username, room, __createdtime__ } = data;
//         //    const { username, room, message, __createdtime__ } = data;
//         //     console.log("send_message, message =",message, "")
//         //     io.in(room).emit('receive_message', data); // Send to all users in room, including sender
//             // harperSaveMessage(message, username, room, __createdtime__) // Save message in db
//             //     .then((response) => console.log(response))
//             //     .catch((err) => console.log(err));
//             // const { uid, email, photoURL } = auth.currentUser;
//             // addDoc(collection(db, "messages"), {
//             //     text: message,
//             //     userUid: uid,
//             //     userName: email,
//             //     avatar: photoURL,
//             //     createdAt: serverTimestamp(),
//             //     chatId: chatId,
//             //     uid: uuid.v4(),
//             // });
//             // setMessage("");
//         // });
//     // });
//
//     socket.on('send_message', (data) => {
//         console.log('send_message =>', data)
//         const { message, username, userName, avatar, createdAt, chatId, uid,  } = data;
//         // io.in(room).emit('receive_message', message); // Send to all users in room, including sender
//         io.in(room).emit('receive_message',
//             {
//                // username: user.email,
//                //  message: message,
//                //  __createdtime__
//                 message: message,
//                 username: user.uid,
//                 userName: user.email,
//                 avatar: user.photoURL,
//                 createdAt: serverTimestamp(),
//                 chatId: room,
//                 uid: uuid.v4(),
//                 __createdtime__
//
//             }); // Send to all users in room, including sender
//         addDoc(collection(db, "messages"), {
//             text: message,
//             userUid: user.uid,
//             userName: user.email,
//             avatar: user.photoURL,
//             createdAt: serverTimestamp(),
//             chatId: room,
//             uid: uuid.v4(),
//         }).then((response) => console.log("resonse")).catch((err) => console.log(err));
//
//     //     harperSaveMessage(message, username, room, __createdtime__) // Save message in db
//     //         .then((response) => console.log(response))
//     //         .catch((err) => console.log(err));
//     });
//
// });
//
// app.get('/', (req, res) => {
//     res.send('Hello world');
// });
//
// chatServer.listen(4000, () => console.log('Server is running on port 4000'));
//
//
//
import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "./firebase.js";

const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat chat
let chatRoomUsers = {};
import * as uuid from 'uuid';
import {firebaseGetMessages} from "./src/services/firebase-get-messages.js"

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

    // Add a user to a room
    socket.on('join_room', (data) => {
        const {username, room} = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room

        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Send welcome msg to user that just joined chat only
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Get last 10 messages sent in the chat room
        firebaseGetMessages(room).then((last100Messages) => {
            console.log('latest100  messages', last100Messages);
            socket.emit('last_100_messages', last100Messages);
        }).catch((err) => console.log(err));


        // // Get last 100 messages sent in the chat room
        // harperGetMessages(room)
        //     .then((last100Messages) => {
        //         // console.log('latest messages', last100Messages);
        //         socket.emit('last_100_messages', last100Messages);
        //     })
        //     .catch((err) => console.log(err));


    });

    socket.on('send_message', (data) => {
        const {message, username, room, __createdtime__} = data;
        io.in(room).emit('receive_message', data); // Send to all users in room, including sender
        // harperSaveMessage(message, username, room, __createdtime__) // Save message in db
        //     .then((response) => console.log(response))
        //     .catch((err) => console.log(err));
        console.log("   text: message,\n" +
            "            userUid: username.uid,\n" +
            "            userName: username.email,\n" +
            "            avatar: username.photoURL,\n" +
            "            createdAt: serverTimestamp(),\n" +
            "            chatId: room,\n" +
            "            uid: uuid.v4(),", {
            text: message,
            userUid: username.uid,
            userName: username.email,
            avatar: username.photoURL,
            createdAt: serverTimestamp(),
            chatId: room,
            uid: uuid.v4(),
        })
        // addDoc(collection(db, "messages"), {
        //     message, username, room,
        //     // __createdtime__
        // });

        // Save the new user to the room
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);

        // Send to all users in room, including sender
        addDoc(collection(db, "messages"), {
            text: message,
            userUid: username.uid,
            userName: username.email,
            avatar: username.photoURL,
            createdAt: serverTimestamp(),
            chatId: room,
            uid: uuid.v4(),
        }).then((response) => console.log("resonse")).catch((err) => console.log(err));

        socket.emit(`generated notification`,`hello`);
        console.log("hello???")
    });

    // socket.on('leave_room', (data) => {
    //     const { username, room } = data;
    //     socket.leave(room);
    //     const __createdtime__ = Date.now();
    //     // Remove user from memory
    //     allUsers = leaveRoom(socket.id, allUsers);
    //     socket.to(room).emit('chatroom_users', allUsers);
    //     socket.to(room).emit('receive_message', {
    //         username: CHAT_BOT,
    //         message: `${username} has left the chat`,
    //         __createdtime__,
    //     });
    //     console.log(`${username} has left the chat`);
    // });

    // socket.on('disconnect', () => {
    //     console.log('User disconnected from the chat');
    //     const user = allUsers.find((user) => user.id == socket.id);
    //     if (user?.username) {
    //         allUsers = leaveRoom(socket.id, allUsers);
    //         socket.to(chatRoom).emit('chatroom_users', allUsers);
    //         socket.to(chatRoom).emit('receive_message', {
    //             message: `${user.username} has disconnected from the chat.`,
    //         });
    //     }
    // });
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

chatServer.listen(4000, () => console.log('Server is running on port 4000'));

