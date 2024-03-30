import {useContext, useState, useEffect} from 'react';
import {db} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext";

import {getAuth} from "firebase/auth";
import {NavLink} from "react-router-dom";


const Users = () => {
//     const [loading, setLoading] = useState(false);
//     const [users, setUsers] = useState([]);
//
//     const {currentUser} = useContext(AuthContext)
//
//     useEffect(() => {
//         console.log("use effect ran");
//
//         setLoading(true)
//         const temp = async () => {
//             // const data = await getDocs(collection(db, "users"));
//             // const querySnapshot = await getDocs(q);
//             const data = getAuth().then((userRecords) => {
//                     // See the UserRecord reference doc for the contents of userRecord.
//                     console.log(`Successfully fetched user data: ${userRecords.toJSON()}`);
//                 })
//                 .catch((error) => {
//                     console.log('Error fetching users data:', error);
//                 });
// console.log("users data in Users = ", data)
//
//             data.forEach((doc) => {
//                 console.log("doc.id ", doc.id)
//                 const result = {
//                     uid: doc.id,
//                     emain: doc.data().email,
//                 };
//                 setUsers((prev) => (
//                     [...prev, result]))
//
//                 setLoading(false)
//                 console.log('users in useEffect = : ', users)
//             });
//         };
//
//         temp().then();
//         console.log("use effect stop")
//     }, []);

    return (
        <div>
            Users:
            {/*{*/}
            {/*    users && users.map((user) => (*/}
            {/*            <NavLink key={user.uid} to={`${user.uid}`}*/}
            {/*                     className={(navData) => (navData.isActive ? 'active' : 'link')}>*/}
            {/*                <div className={`${(user.id === currentUser) ? "activeUser" : "linkUser"} userCard`}>*/}

            {/*                    <span>{user.email}</span>*/}
            {/*                </div>*/}
            {/*            </NavLink>*/}

            {/*        )*/}
            {/*    )*/}
            {/*}*/}

        </div>
    )
}

export default Users;



