import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  userId: null,
  actions: {
    login: (email, password, onSuccess = () => {}) => Promise.resolve(),
    register: (email, password, name) => Promise.resolve(),
    logout: () => {}
  },
};

const UserContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(defaultState.userId);

  useEffect(() => {
    if (!userId) {
      const storedUserId = localStorage.getItem("BLOG:userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

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
      localStorage.setItem("BLOG:userId", data._id);
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

  //TODO: Handle logout
  const logout = () => {
    localStorage.removeItem("BLOG:userId");
    setUserId(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        actions: {
          login,
          register,
          logout,
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
