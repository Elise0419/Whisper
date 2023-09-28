import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const history = useHistory();

    useEffect(() => {
        try {
            fetch('http://118.233.222.23:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 403) {
                        history.push("/verify");
                        throw new Error("API request failed");
                    }
                    if (res.status === 401) {
                        history.push("/login");
                    }
                    if (res.status >= 200) {
                        return res.json();
                    }
                })
                .then((jsonData) => {
                    console.log(jsonData);
                    setUser(jsonData.user);
                    if (jsonData.error) {
                        console.log("錯誤訊息:", jsonData.error);
                    } else {
                        // setUser(jsonData.user);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                });

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, []);

    const value = {
        user,
        setUser,
    };


    return (
        <UserContext.Provider value={value}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}







