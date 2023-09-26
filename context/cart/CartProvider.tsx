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

    const addProductToCart = ( product: ICartProduct ) => {

        console.log(product);
        const productInCart = state.cart.some( p => p._id === product._id)
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updateProducts = state.cart.map( p => {
            if ( p._id !== product._id )
        
            return p;

        // Actualizar cantidad
        p.quantity += product.quantity;
            
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updateProducts });

    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart
        }}>
            { children }
        </CartContext.Provider>
    )
};