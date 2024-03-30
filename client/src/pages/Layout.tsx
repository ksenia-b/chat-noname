import {Outlet} from "react-router-dom";
import MainNav from "../components/MainNav";
import { signOut } from "firebase/auth";
import {AuthContext} from "../auth/AuthContext";
import React, { useContext } from "react";
import { auth } from '../firebase.js';
const Layout = () => {
    const {currentUser} = useContext(AuthContext)
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div>
            <h1>Chat app</h1>
            <MainNav/>
            {currentUser && <button onClick={handleLogout}>
                Logout
            </button>}
            <Outlet/>
        </div>
    )
}

export default Layout;