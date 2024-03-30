// import React, {useContext, useState, useEffect} from 'react';
// import {signOut} from "firebase/auth";
// import {auth, db} from '../firebase.js';
// import {useNavigate} from 'react-router-dom';
// import {AuthContext} from "../auth/AuthContext";
// import ChatPanel from "../components/ChatPanel";
// import {collection, getDocs} from "firebase/firestore";
//
// const Home = () => {
//     // const [loading, setLoading] = useState(false);
//     // const [chats, setChats] = useState([]);
//
//     const navigate = useNavigate();
//     const {currentUser} = useContext(AuthContext)
//
//     useEffect(() => {
//         console.log("use effect ran");
//
//         setLoading(true)
//         // (async () => {
//             const temp = async () => {
//                 const data = await getDocs(collection(db, "chats"));
//                 // const querySnapshot = await getDocs(q);
//
//                 data.forEach((doc) => {
//                     console.log("doc.id ", doc.id)
//                     const result = {
//                         key: doc.id,
//                         id: doc.id,
//                         title: doc.data().title,
//                         description: doc.data().description
//                     };
//
//                     console.log('res: ', result)
//                     setChats((prev) => [...prev, result]);
//                     setLoading(false)
//                 });
//             };
//
//             temp().then();
//  console.log("use effect stop")
//     }, []);
//
//
//     const handleLogout = () => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             navigate("/");
//             console.log("Signed out successfully")
//         }).catch((error) => {
//             // An error happened.
//         });
//     }
//     return (
//         <>
//             {currentUser?.uid ?
//                 <nav>
//                     <p>
//                         Welcome Home, {currentUser?.uid}
//                     </p>
//                     <div>
//                         <button onClick={handleLogout}>
//                             Logout
//                         </button>
//
//                         <div>
//                             {loading ? (
//                                 <h4>Loading...</h4>
//                             ) :   <ChatPanel chats={chats}/>
//                             //     (
//                             //     chats && chats.map((item) => (
//                             //         // Presently we only fetch
//                             //         // title from the API
//                             //         <h4>{item.uid}</h4>
//                             //     ))
//                             // )
//
//                             }
//                         </div>
//                     </div>
//                 </nav> :
//                 <h3>Home page</h3>
//             }
//         </>
//     )
// }
//
// export default Home;


import {useContext} from "react";
import {navigate, useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";
const Home = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)

    return (
        <>Home page:
    {currentUser && navigate("/chats") }
        </>
    )
}

export default Home;