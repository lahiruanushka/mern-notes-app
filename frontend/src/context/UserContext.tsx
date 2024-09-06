import React, { createContext, useState, useEffect, useContext } from "react";
import { getLoggedInUser, login, logout, signUp, User, LoginCredentials, SignUpCredentials } from "../api/authApi";

interface UserContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch the logged-in user on app start
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        setUser(loggedInUser);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    const loggedInUser = await login(credentials);
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleSignUp = async (credentials: SignUpCredentials) => {
    const newUser = await signUp(credentials);
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, login: handleLogin, logout: handleLogout, signUp: handleSignUp }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
