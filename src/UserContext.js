import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({ topics: [] });

  return (
    <UserContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserContext.Provider>
  );
};
