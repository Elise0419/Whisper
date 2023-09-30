import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://118.233.222.23:8000/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    setUser(data.user);
                    setLogin(true);
                } else {
                    console.error('HTTP Error:', response.status);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={[user,
            setUser, login, setLogin]}>
            {children}
        </UserContext.Provider>
    );
}







