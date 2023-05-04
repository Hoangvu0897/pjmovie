import React, { useState } from 'react';
import AuthContext from './AuthContext';
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = async (email, password) => {
        // Gọi API để xác thực thông tin đăng nhập
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (response.ok) {
            const data = await response.json();
            setUser({ email, username: data.username });
            return true;
        } else {
            return false;
        }
    };



    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
