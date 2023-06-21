import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const {signup, errors} = useAuthContext();

    const handleSignup = async (event) => {
        event.preventDefault();
        signup({name, email, password, password_confirmation})
    }

    return (
        <>
        <div className="grid align-item">
            <div className="auth">
                <h2>Sign Up</h2>

                <form onSubmit={handleSignup} className="form">

                    <div className="form-field">
                        <input type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name" />
                        {errors.name && (
                            <small className="red">
                                {errors.name[0]}
                            </small>
                        )}
                    </div>

                    <div className="form-field">
                        <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" />
                        {errors.email && (
                            <small className="red">
                                {errors.email[0]}
                            </small>
                        )}
                    </div>

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
                        <button type="submit">Sign Up</button>
                    </div>

                </form>

                <span>Already have an accout? <Link to="/login">Log in</Link></span>

            </div>
        </div>
    </>
    )
}

export default SignUp