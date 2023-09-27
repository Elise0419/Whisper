import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        mem_name: '',
        headimg: '',
        promise: '',
        email: '',
        person_id: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            fetch('http://118.233.222.23:8000/api/profile')
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, []);


    const value = {
        user,
        updateUser: (newUserData) => setUser(newUserData),
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







