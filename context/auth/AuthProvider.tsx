import { FC, ReactNode, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';

import { margaretApi } from '@/api';
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
    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await margaretApi.post('user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type:'[Auth] - Login', payload: user });
            return true;
            
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,

        }}>
            { children }
        </AuthContext.Provider>
    )
};