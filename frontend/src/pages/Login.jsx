import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import loadingGif from "../assets/spinner.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, errors } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    login({ email, password });
  };

  return (
    <>
      <div className="grid align-item">
        <div className="auth">
          <h2>Log In</h2>

          <form onSubmit={handleLogin} className="form">
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                <small className="red">{errors.password[0]}</small>
              )}
            </div>

            <div className="form-field">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <img
                    src={loadingGif}
                    alt="Loading"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>

          <Link to="/forgot-password">Forgot Password?</Link>
          <br />
          <span>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
