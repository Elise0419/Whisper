import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);

    const value = {
        user,
        setUser,
        login,
        setLogin,
    };


    return (
        <UserContext.Provider value={[user,
            setUser, login, setLogin]}>
            {children}
        </UserContext.Provider>
    );
}







