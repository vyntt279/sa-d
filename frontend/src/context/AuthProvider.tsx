import { createContext, useState } from "react";

interface AuthContextInterface {
    auth: AuthInfo,
    setAuth: (value: AuthInfo) => void
    user: UserInfo,
    setUser: (value: UserInfo) => void
}

type AuthInfo = {
    role: number,
    token: string,
}

type UserInfo = {
    username: string
}

const defaultAuthContext: AuthContextInterface = {
    auth: {
        role: 0,
        token: ''
    },
    setAuth: (value: AuthInfo) => {},
    user: {
        username: ''
    },
    setUser: (value: UserInfo) => { },
}

const AuthContext = createContext<AuthContextInterface>(defaultAuthContext);


export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState({ role: 0, token: ''});
    const [user, setUser] = useState({ username: '' });

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;