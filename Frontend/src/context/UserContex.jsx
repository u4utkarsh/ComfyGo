import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <UserContext.Provider value={[user, setuser]}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
