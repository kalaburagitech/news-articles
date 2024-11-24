import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({ topics: [] });

  return (
    <UserContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
