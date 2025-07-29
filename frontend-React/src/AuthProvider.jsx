import React from "react";
import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  return (
    <AuthContext.provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.provider>
  );
};

export default AuthProvider;
export { AuthContext };
