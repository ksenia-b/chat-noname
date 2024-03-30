import {useContext, useEffect, useState} from "react";
import {db} from "../../firebase.js";
import {collection, query, where, getDocs, orderBy, limit, onSnapshot} from "firebase/firestore";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../auth/AuthContext";
import MessagesReceived from "../MessagesRecevied/index.jsx";

const Messages = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const {currentUser, socket} = useContext(AuthContext)


    useEffect(() => {
        // Listen for 'receive_message' event from the server
        socket.on('receive_message', (data) => {
            // Update messages state with the new message
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    // // Runs whenever a socket event is recieved from the server
    // useEffect(() => {
    //     socket.on('receive_message', (data) => {
    //         console.log(data);
    //         setMessagesReceived((state) => [
    //             ...state,
    //             {
    //                 message: data.message,
    //                 username: data.username,
    //                 __createdtime__: data.__createdtime__,
    //             },
    //         ]);
    //     });
    //
    //     // Remove event listener on component unmount
    //     return () => socket.off('receive_message');
    // }, [socket]);

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            where("chatId", "==", chatId),
            orderBy("createdAt", "asc"),
            limit(10)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, [chatId]);

    useEffect(() => {
        console.log("use effect ran");

        setLoading(true)
        const temp = async () => {
            const citiesRef = collection(db, "messages");

            const q = query(citiesRef, where("chatId", "==", chatId));

            const querySnapshot = await getDocs(q);
            console.log("querySnapshot = ", querySnapshot)

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setMessages((prev) => (
                            [...prev, doc.data()]))
                setLoading(false)
            });

        };

        temp().then();
    }, []);
console.log("message.userUid === currentUser ")
    return (
        <div>
            {loading ? (
                <h4>Loading messages...</h4>
            ) :
                messages.map(message => {
                    return <div key={message?.uid} className={`message ${message.userUid === currentUser.uid ? 'currentUser' : 'otherUser'}`}>
                        <div style={{fontSize: "10px", display:"flex", flexDirection:"row", justifyContent:"space-between"}}><span>{message.userName}</span>  <span>{message?.createdAt?.seconds}</span></div>
                       <p>{message.text}</p>
                    </div>
                    }
                )
            }
            <div>
                New messages:
                <MessagesReceived  messagesRecieved={messagesRecieved} setMessagesReceived={setMessagesReceived}/>
            {/*    <div >*/}
            {/*        {*/}
            {/*            messagesRecieved.map((msg, i) => (*/}
            {/*            <div key={i}>*/}
            {/*                <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
            {/*                    <span >{msg.username}</span>*/}
            {/*                    <span >*/}
            {/*  {formatDateFromTimestamp(msg.__createdtime__)}*/}
            {/*</span>*/}
            {/*                </div>*/}
            {/*                <p >{msg.message}</p>*/}
            {/*                <br/>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}


            </div>
        </div>
    )
}

export default Messages;