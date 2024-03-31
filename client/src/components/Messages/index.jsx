import {useState, useEffect, useRef, useContext} from 'react';
import {AuthContext} from "../../auth/AuthContext";

const Messages = ({chatId}) => {
    console.log("chatId = ", chatId)
    const {currentUser, socket} = useContext(AuthContext);
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setLoading(true);
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);
            setLoading(false);
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket, chatId]);

    // useEffect(() => {
    //     console.log("chat id has been changed");
    //     setMessagesReceived([])
    // }, [chatId]);

    useEffect(() => {
        // Last 100 messages sent in the chat room (fetched from the db in backend)
        socket.on('last_100_messages', (last100Messages) => {
            setLoading(true);
            console.log('Last 100 messages:', last100Messages);
            // last100Messages = JSON.parse(last100Messages);
            // // Sort these messages by __createdtime__
            // last100Messages = sortMessagesByDate(last100Messages);
            setMessagesReceived((state) => [...last100Messages, ...state]);
            setLoading(false);
        });

        return () => socket.off('last_100_messages');
    }, [socket]);

    function sortMessagesByDate(messages) {
        return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__));
    }

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div>
            {loading ? (
                <h4>Loading chats...</h4>
            ) : (
                <div ref={messagesColumnRef}>
                    {messagesRecieved.map((item) => (
                        <div key={item.uid}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>{item.userName}</span>
                                <span>
                                    {formatDateFromTimestamp(item.createdAt?.seconds)}
                                </span>
                            </div>
                            <p>{item.text}</p>
                            <br/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;
