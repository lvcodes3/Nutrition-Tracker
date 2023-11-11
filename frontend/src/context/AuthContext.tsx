// dependencies //
import { createContext, Dispatch, SetStateAction } from 'react';

export type UserType = {
    id: null | number;
    firstName: null | string;
    email: null | string;
    createdAt: null | string;
    updatedAt: null | string;
    lastSignedIn: null | string;
    authenticated: boolean;
};

export const initialUser: UserType = {
    id: null,
    firstName: null,
    email: null,
    createdAt: null,
    updatedAt: null,
    lastSignedIn: null,
    authenticated: false
};

interface AuthContextType {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
};

const initialAuthState: AuthContextType = {
    user: initialUser,
    setUser: () => {}
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);