import { Link, Route, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg';
import './assets/css/App.css';
import useAuthContext from "./context/AuthContext";

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';

function App() {
  const { user, logout } = useAuthContext();
  return (
    <div className="App">

      <div className="header">
        <Link to="/" className="header-logo" aria-current="page">
          <img src={reactLogo} className="logo" alt="React logo" />
          <span className="logo-text">News Aggregator</span>
        </Link>
        <div className="header-right">
          <Link to="/" className="link nor-link" aria-current="page">Home</Link>

          {user ? 
          <>
            <button onClick={logout} className="link logout" aria-current="page">Logout</button>
          </> : 
          <>
            <Link to="/signup" className="link sign-up-red" aria-current="page">Sign up</Link>
            <Link to="/login" className="link nor-link" aria-current="page">Log in</Link>
          </>
          }
        
        </div>
      </div>

      <div className="content-wrapper">

      <Routes>

        <Route element={<AuthLayout />}>
            //.. force login
        </Route>

        <Route path='/' element={<Home />} />

        <Route element={<GuestLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/password-reset/:token' element={<ResetPassword />} />
        </Route>

      </Routes>

      </div>

      <footer className="footer">
        <small>© 2023 News Aggregator</small>
      </footer>

    </div>
  )
}

export default App
