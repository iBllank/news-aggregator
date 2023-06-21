import { useState, useEffect } from "react";
import axios from '../api/axios';
import { Link, useParams, useSearchParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [searchParams] = useSearchParams();
    const { token } = useParams();

    const { csrf } = useAuthContext();


    useEffect( () => {
        setEmail(searchParams.get('email'))
        
    }, []) 

    const handleSubmit = async (event) => {
        event.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        try{
            const response = await axios.post('/reset-password', 
            {
                token,
                email,
                password,
                password_confirmation
            });
            setStatus(response.data.status)
        }catch(e){
            if(e.response.status == 422){
                setErrors(e.response.data.errors)
            }
        }
    }
    return (
        <>
        <div className="grid align-item">
            <div className="auth">
                <h2 className="forgot-h2">Reset Password</h2>
                {status &&  ( <div className="forgot-status">{status}</div> )}
                <form onSubmit={handleSubmit} className="form">

                <div className="form-field">
                        <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" />
                        {errors.password && (
                            <small className="red">
                                {errors.password[0]}
                            </small>
                        )}
                    </div>

                    <div className="form-field">
                        <input type="password" value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Password Confirmation" />
                        {errors.password_confirmation && (
                            <small className="red">
                                {errors.password_confirmation[0]}
                            </small>
                        )}
                    </div>


                    <div className="form-field">
                        <button type="submit">Reset Password</button>
                    </div>

                </form>

                <span>Back to <Link to="/login">Log in</Link></span>

            </div>
        </div>
    </>
    )
};

export default ResetPassword;