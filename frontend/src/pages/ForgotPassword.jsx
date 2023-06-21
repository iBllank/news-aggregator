import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const { csrf } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();
    try {
      const response = await axios.post("/forgot-password", { email });
      setStatus(response.data.status);
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <div className="grid align-item">
        <div className="auth">
          <h2 className="forgot-h2">Forgot Password</h2>
          <div className="forgot-text">
            Forgot your password? Let us know your email address, and we will
            email you a password reset link.
          </div>
          {status ? (
            <div className="forgot-status">{status}</div>
          ) : null}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {errors.email && (
                <small className="red">{errors.email[0]}</small>
              )}
            </div>

            <div className="form-field">
              <button type="submit">Send</button>
            </div>
          </form>

          <span>
            Back to <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
