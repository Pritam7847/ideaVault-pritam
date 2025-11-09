import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("Users");
      // If value exists and is valid JSON, parse it
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : undefined;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return undefined;
    }
  });

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
