import { createContext, useContext, useEffect, useState } from "react";
import { getRefreshTokenFromStorage, getTokenFromStorage, removeRefreshTokenFromStorage, removeTokenFromStorage, setRefreshTokenInStorage, setTokenInStorage } from "../utils/storageKit";

const defaultState = {
  userId: null,
  token: null,
  user: null,
  actions: {
    login: (email, password, onSuccess = () => {}) => Promise.resolve(),
    register: (email, password, name) => Promise.resolve(),
    getAuthorizationHeader: () => "",
    logout: () => {}
  },
};

const UserContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(defaultState.token);
  const [user, setUser] = useState(defaultState.user)

  useEffect(() => {
    if (!token) {
      const storedToken = getTokenFromStorage()
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect( () => {
    if(token) {
      getUser()
    }
  },[token])

  const getAuthorizationHeader = () => {
    return `Bearer ${token}`
  }

  const login = async (_email, _password, onSuccess = () => {}) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: _email, password: _password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTokenInStorage(data.token)
      setRefreshTokenInStorage(data.refreshToken)
      setToken(data.token)
      onSuccess();
      return;
    }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Register successful you can now login");
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Register failed");
    }
  };

  const getUser = async () => {
    if(!token) {
      return
    }
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getAuthorizationHeader()
        },
      });
      if (response.ok) {
        const user = await response.json()
        setUser(user)
        console.log(user)
        return;
      }
      if(response.status === 401) {
        console.log("Token expired")
        refreshAccessToken()
      }
    } catch(error) {
      console.warn("Error getting user", error)
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/token/refresh", {
        method: "POST",
        body: JSON.stringify({
          token: getRefreshTokenFromStorage()
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok) {
        const data = await response.json()
        setTokenInStorage(data.token)
        setToken(data.token)
        return;
      }
      logout()
    } catch (error) {
      console.error(error);
      logout()
    }
  }

  const logout = () => {
    removeTokenFromStorage()
    removeRefreshTokenFromStorage()
    setToken(null);
    setUser(null)
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        actions: {
          login,
          register,
          logout,
          getAuthorizationHeader
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const blogPosts = useContext(UserContext);
  return blogPosts;
};
