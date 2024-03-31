import React, {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext";

const Message = ({message}) => {
    console.log("message = ", message)
    const {currentUser} = useContext(AuthContext)

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className={`message ${message.userUid === currentUser.uid ? "currentUser" : "otherUser"}`}>

            <div key={message.uid}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>{message.userName}</span>
                    <span>
                                    {formatDateFromTimestamp(message.createdAt?.seconds)}
                                </span>
                </div>
                <p>{message.text}</p>
                <br/>
            </div>
        </div>
    );
};

export default Message;