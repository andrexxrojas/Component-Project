import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Signup, CheckAuth, Logout } from "./services/auth.service.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await CheckAuth();
        setIsLoggedIn(data.loggedIn === true);
        setUser(data.user || null);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    void verifyAuth();
  },[])

  const login = (username, password) => {
    setLoading(true);

    Login(username, password)
        .then(() => {
          setIsLoggedIn(true);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
  };

  const logout = () => {
    setLoading(true);

    Logout()
        .then(() => {
          setIsLoggedIn(false);
          navigate("/");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          // Still clear local state even if API fails
          setIsLoggedIn(false);
          navigate("/");
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
  };

  const signup = (username, email, password) => {
    setLoading(true);

    Signup(username, email, password)
        .then(() => {
          setIsLoggedIn(true);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Signup failed:", error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
      <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, signup }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}