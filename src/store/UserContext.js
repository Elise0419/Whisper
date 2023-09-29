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
        function fetchData() {
            fetch(`http://118.233.222.23:8000/api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.status >= 400) {

                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    setUser(data.user);
                    setLogin(true)
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
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







