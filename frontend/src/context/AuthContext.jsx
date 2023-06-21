import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      // Handle error state or display error message
    }
  };

  const login = async (data) => {
    try {
      await axios.post("/login", data);
      await getUser();
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const signup = async (data) => {
    try {
      await axios.post("/register", data);
      await getUser();
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error state or display error message
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error getting CSRF token:", error);
      // Handle error state or display error message
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, errors, getUser, login, signup, logout, csrf }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
