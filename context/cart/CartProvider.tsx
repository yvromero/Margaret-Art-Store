import { FC, useReducer, ReactNode } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
    cart: ICartProduct[];
}
interface UiProviderProps {
    children: ReactNode; 
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
}


export const CartProvider:FC<UiProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE);

    return (
        <CartContext.Provider value={{
            ...state
        }}>
            { children }
        </CartContext.Provider>
    )
};