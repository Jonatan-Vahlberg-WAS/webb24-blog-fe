import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  userId: null,
  actions: {
    login: (userId) => {}, //TODO: implement actual login
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

  const login = (_userId) => {
    //TODO: handle login to backend
    setUserId(_userId);

    //TODO: If login is successful set localstorage of userId
    localStorage.setItem("BLOG:userId", _userId);
  };

  //TODO: Handle register

  //TODO: Handle logout

  return (
    <UserContext.Provider
      value={{
        userId,
        actions: {
          login,
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
