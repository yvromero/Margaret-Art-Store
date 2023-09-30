import { FC, ReactNode, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

interface AuthProviderProps {
    children: ReactNode; 
}


const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<AuthProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer , Auth_INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods

        }}>
            { children }
        </AuthContext.Provider>
    )
};