// dependencies //
import { createContext, Dispatch, SetStateAction } from 'react';

export type ConsumerType = {
    id: null | number;
    firstName: null | string;
    email: null | string;
    createdAt: null | string;
    updatedAt: null | string;
    lastSignedIn: null | string;
    authenticated: boolean;
};

export const initialConsumer: ConsumerType = {
    id: null,
    firstName: null,
    email: null,
    createdAt: null,
    updatedAt: null,
    lastSignedIn: null,
    authenticated: false
};

interface AuthContextType {
    consumer: ConsumerType;
    setConsumer: Dispatch<SetStateAction<ConsumerType>>;
};

const initialAuthState: AuthContextType = {
    consumer: initialConsumer,
    setConsumer: () => {}
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);