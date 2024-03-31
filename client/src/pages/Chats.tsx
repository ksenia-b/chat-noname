import {useContext, useState, useEffect} from 'react';
import {db} from '../firebase.js';
import {AuthContext} from "../auth/AuthContext";
import ChatPanel from "../components/ChatPanel";
import Users from "../components/Users/index.jsx";
import {collection, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";


const Chats = () => {

    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    const {currentUser, socket} = useContext(AuthContext)

    useEffect(() => {

        setLoading(true)
        const temp = async () => {
            const data = await getDocs(collection(db, "chats"));
            data.forEach((doc) => {
                console.log("doc.id ", doc.id)
                const result = {
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description
                };
                setChats((prev) => (
                    [...prev, result]))

                setLoading(false)
                console.log('chats in useEffect = : ', chats)
            });
        };


        temp().then();
        console.log("use effect stop")
    // }, []);

    }, [socket]);

    return (
        <>
            {currentUser?.uid ?
                <div>
                    <span> Welcome Home, {currentUser?.email}</span>
                    <div>
                        {loading ? (
                            <h4>Loading chats...</h4>
                        ) : (
                            <div><ChatPanel chats={chats}/>
                                <Users/>
                            </div>)
                        }

                    </div>
                </div> : <h3>Home page</h3>
            }

        </>
    )
}

export default Chats;



