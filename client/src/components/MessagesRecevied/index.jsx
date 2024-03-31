// // client/src/pages/chat/MessagesReceived.js
//
// import React, {useState, useEffect, useContext} from 'react';
// import {AuthContext} from "../../auth/AuthContext.jsx";
//
//
// const MessagesReceived = ({messagesRecieved, setMessagesReceived}) => {
//     console.log("messagesRecieved in messagesRecieved = ", messagesRecieved);
//     // const [messages, setMessages] = useState([]);
//     const {currentUser, socket} = useContext(AuthContext)
//     // dd/mm/yyyy, hh:mm:ss
//     function formatDateFromTimestamp(timestamp) {
//         console.log("timestamp = ", timestamp)
//         const date = new Date(timestamp);
//         return date.toLocaleString();
//     }
//     // Runs whenever a socket event is recieved from the server
//     useEffect(() => {
//         socket.on('receive_message', (data) => {
//             console.log(" receive_message = " , data);
//             setMessagesReceived((state) => [
//                 ...state,
//                 {
//                     message: data.message,
//                     username: data.username,
//                     __createdtime__: data.__createdtime__,
//                 },
//             ]);
//         });
//
//         // Remove event listener on component unmount
//         return () => socket.off('receive_message');
//     }, [socket]);
//
//     // useEffect(() => {
//     //     // Listen for 'receive_message' event from the server
//     //     socket.on('receive_message', (data) => {
//     //         // Update messages state with the new message
//     //         setMessages((prevMessages) => [...prevMessages, data]);
//     //     });
//     //
//     //     // Clean up the event listener when the component unmounts
//     //     return () => {
//     //         socket.off('receive_message');
//     //     };
//     // }, [socket]);
//
//     return (
//         <div >
//                 {messagesRecieved.map((msg, index) => (
//                     <div>{msg.message}</div>
//                     // <li key={index}>
//                     //     {formatDateFromTimestamp(msg.__createdtime__)}
//                     //     <strong>{msg.username}: </strong>
//                     //     {msg.message}
//                     // </li>
//
//                    //   <div key={msg?.uid} className={`message ${message.userUid === currentUser.uid ? 'currentUser' : 'otherUser'}`}>
//                    //      <div style={{fontSize: "10px", display:"flex", flexDirection:"row", justifyContent:"space-between"}}><span>{message.userName}</span>  <span>{message?.createdAt?.seconds}</span></div>
//                    //      <p>{message.text}</p>
//                    // </div>
//         ))}
//
//         </div>
//     // messages.map(message => {
//     //         return <div key={message?.uid} className={`message ${message.userUid === currentUser.uid ? 'currentUser' : 'otherUser'}`}>
//     //             <div style={{fontSize: "10px", display:"flex", flexDirection:"row", justifyContent:"space-between"}}><span>{message.userName}</span>  <span>{message?.createdAt?.seconds}</span></div>
//     //             <p>{message.text}</p>
//     //         </div>
//     //     }
//
//     );
// };
//
// export default MessagesReceived
//
//
// // <div>
// //     {messagesRecieved.map((msg, i) => (
// //         <div key={i}>
// //             <div style={{display: 'flex', justifyContent: 'space-between'}}>
// //                 <span>{msg.username}</span>
// //                 <span>
// //               {formatDateFromTimestamp(msg.__createdtime__)}
// //             </span>
// //             </div>
// //             <p>{msg.message}</p>
// //             <br/>
// //         </div>
// //     ))}
// // </div>