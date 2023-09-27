import { FC, useEffect, useState, useReducer, ReactNode } from 'react';
import Cookie from 'js-cookie';
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

    const [isMounted, setIsMounted] = useState(false);

    // Para resolver el problema del Strict Mode en React
    // Para leer de las cookies

    useEffect(() => {

        if (!isMounted) {
            try {

                const cookieProducts = Cookie.get('cart')
                ? JSON.parse( Cookie.get('cart')! )
                : [];
                dispatch({ 
                    type: '[Cart] - LoadCart from cookies | storage', 
                    payload: cookieProducts });
            } catch (error) {
                dispatch({ type: '[Cart] - LoadCart from cookies | storage', 
                payload: [] });
            }
            setIsMounted(true);
        }

    }, [isMounted]);

    useEffect(() => {

        if (isMounted) Cookie.set('cart', JSON.stringify(state.cart));

    }, [state.cart, isMounted]);



    // // Para leer de las cookies
    // useEffect(() => {
    //     const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
    //     dispatch({ type : '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
    // }, [])


    // // Para almacenar las cookies
    // useEffect(() => {
    //     Cookie.set('cart', JSON.stringify( state.cart ))

    // }, [state.cart])



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