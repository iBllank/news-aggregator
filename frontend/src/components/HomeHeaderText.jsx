import React from 'react';
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom"

const HomeHeaderText = () => {
    const { user } = useAuthContext();
    return (
        <>
            {user ?
                <>
                <h2>Welcome, {user?.name} ❤️</h2>
                </> :
                <>
                <h2>Sign up and get personalised news</h2>
                <h2>Just for you ❤️</h2>
                <div className='page-sign-up'>
                    <Link to="/signup" className="link sign-up-red" aria-current="page">Sign up</Link>
                </div>
                </>
            }
        </> 
    );
}

export default HomeHeaderText;