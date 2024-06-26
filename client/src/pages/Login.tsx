import React, {useContext, useState} from "react";
import {navigate} from "react-router-dom";
import {auth} from "../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";
import {Formik, Form} from 'formik';

const Login = () => {

    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)
    console.log("current user in Login = ", currentUser)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSetEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleSetPassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        console.log("email = ", email);
        console.log("password = ", password);
        try {
            await signInWithEmailAndPassword(auth, email, password).catch(err => setError(err.message))

            console.log("login sucessful", auth)
            navigate("/chats");
        } catch {
            console.log("You entered a wrong username or password.", email, password);
        }
    }

    if (currentUser?.uid) {
        return <Navigate to='/' replace/>

    }

    return (
        <div>
            <span>Login</span>
            <div>
                <Formik initialValues={{}}
                        onSubmit={loginWithUsernameAndPassword}
                >
                    {({errors, touched}) => (
                        <Form>
                            Login: <input name="login" placeholder="Login or email" onChange={handleSetEmail}/>
                            Password: <input name="password" placeholder="Password" onChange={handleSetPassword}/>

                            <div>
                                {/*<div onClick={openModal}><span>Регистрация</span></div>*/}
                                <Link to="forgot-password"><span>Забыли пароль?</span></Link>
                            </div>
                            <div>
                                <button type="submit"
                                        onClick={(e) => loginWithUsernameAndPassword(e)}>Login
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login