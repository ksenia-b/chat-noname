import {Navigate} from 'react-router-dom'
//import {useAuthValue} from './AuthContext'
import {useContext} from 'react'
import {AuthContext} from './AuthContext'
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'

export default function RequireAuth({children}) {
    const {currentUser} = useContext(AuthContext)
    // console.log('d: ', d);
// debugger
    console.log("PrivateRoute, currentUser = ", currentUser)
    // const {currentUser} = useAuthValue()
    console.log("currentUser.uuid = ", currentUser)

    if (currentUser === null) {
        console.log("Loading...", currentUser)
    }

    // if (!currentUser?.emailVerified) {
    if (!currentUser?.uid) {
        return <Navigate to='/login' replace/>

    }

    return children;
}