import {useState, useRef, useEffect, useContext} from "react";
import {useParams, useOutletContext} from 'react-router-dom';
import MessageForm from "../components/MessageForm";
import {AuthContext} from "../auth/AuthContext";
import {collection, query, orderBy, limit, onSnapshot, where} from "firebase/firestore";
import {db} from '../firebase.js';
import Message from "../components/Message"

const ChatDetails = () => {
    const {chatId} = useParams();
    const currentChat = useOutletContext();
    console.log("chat detail..", chatId, currentChat)

    const {currentUser, socket} = useContext(AuthContext)
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const q = query(
            collection(db, "messages"), where("chatId", "==", chatId),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({...doc.data(), id: doc.id});
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        // socket.emit(`generated notification`, "notificationnnn")
        return () => unsubscribe;

    }, [chatId]);

    return (
        <div className="chatDetailsPanel">
            <div>
                <h3>{currentChat?.title}</h3>
                <span>{currentChat?.description}</span>
            </div>
            {/*<Messages chatId={chatId} messages={messages}/>*/}
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message}/>
                ))}
            </div>
            <MessageForm chatId={chatId}/>

        </div>
    )
}

export default ChatDetails;