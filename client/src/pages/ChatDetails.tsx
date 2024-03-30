import { useParams, useOutletContext} from 'react-router-dom';
import MessageForm from "../components/MessageForm";
import Messages from "../components/Messages";
const ChatDetails = () => {
    const { chatId } = useParams();
    const currentChat = useOutletContext();
    console.log("chat detail..", chatId, currentChat)
    return (
        <div className="chatDetailsPanel">
            <div>
                <h3>{currentChat?.title}</h3>
                <span>{currentChat?.description}</span>
            </div>
            <Messages chatId={chatId}/>
            <MessageForm chatId={chatId}/>

        </div>
    )
}

export default ChatDetails;