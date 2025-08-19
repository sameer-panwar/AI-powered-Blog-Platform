// Context/LogoutContext.jsx
import { createContext, useContext, useState } from "react";

const LogOutContext = createContext();

export const LogOutProvider = ({ children }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  return (
    <LogOutContext.Provider value={{ showLogoutPopup, setShowLogoutPopup }}>
      {children}
    </LogOutContext.Provider>
  );
};

export const useLogout = () => useContext(LogOutContext);
