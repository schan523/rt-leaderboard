import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface AuthContextValue {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

interface Children {
    children: ReactNode;
}

const initialValue = {
    token: "",
    setToken: () => {}
}

export const AuthContext = createContext<AuthContextValue>(initialValue);

export const AuthProvider = ({ children }: Children): React.JSX.Element => {
    const [token, setToken] = useState("");

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const authContextValue = () => useContext(AuthContext);