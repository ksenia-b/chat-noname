import {NavLink, useParams} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import {Outlet} from "react-router-dom"
// import {
//     query,
//     collection,
//     orderBy,
//     onSnapshot,
//     limit, where,
// } from "firebase/firestore";
// import { db } from "../../firebase";
import {AuthContext} from "../../auth/AuthContext";


const ChatPanel = ({chats}) => {
    const {currentUser, socket} = useContext(AuthContext);

    let email = currentUser.email;
    console.log("current user in chat pannel = ", currentUser.email);
    const {chatId} = useParams();
    console.log("chats = ", chats, "chatId = ", chatId);
    const [currentChat, setCurrentChat] = useState(null);
    useEffect(() => {
        const chat = chats.find(item => item.id === chatId);
        if (chat) {
            setCurrentChat(chat);
        } else {
            setCurrentChat(null);
        }
    }, [chatId]);

    const joinChat = () => {
        if (chatId !== '' && currentUser !== '') {
            console.log("socket, join_chat ----> ", email, chatId)
            socket.emit('join_room', {username: email, room: chatId});
        }
    };

    // useEffect(() => {
    //     socket.emit('recieve_message', {username: email, room: chatId});
    // }, [socket]);

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div>
                {
                    chats && chats.map((item) => (
                            <NavLink onClick={joinChat} key={item.id} to={`${item.id}`}
                                     className={(navData) => (navData.isActive ? 'active' : 'link')}>
                                <div className={`${(item.id === chatId) ? "active" : "link"} chatCard`}>

                                    <span>{item.title}</span>
                                    <p>{item.description}</p>
                                </div>
                            </NavLink>

                        )
                    )
                }

            </div>
            {/*<Outlet context={chats.map(item => (item.id === chatId) ? item : {})}/>*/}
            <Outlet context={currentChat}/>

        </div>

    )
}

export default ChatPanel;