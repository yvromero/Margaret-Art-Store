import { FC, useEffect, useState, useReducer, ReactNode } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

interface UiProviderProps {
    children: ReactNode; 
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
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


    // Para almacenar y actualizar las cookies
    useEffect(() => {

        if (isMounted) Cookie.set('cart', JSON.stringify(state.cart));

    }, [state.cart, isMounted]);


    // Calcular montos 
    useEffect(() => {

        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev, 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal + (subTotal * taxRate) 
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary})
        // console.log({orderSummary});

    }, [state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {

        const productsInCart = state.cart.filter( p => p._id !== product._id );
        dispatch({ 
            type: '[Cart] - Update products in cart', 
            payload: [ ...productsInCart, product ]})


        const productInCart = state.cart.some( p => p._id === product._id)

        if ( !productInCart )

            return dispatch({
                type: '[Cart] - Update products in cart', 
                payload: [...state.cart, product ] 
            })

        // Acumular
        const updateProducts = state.cart.map( p => {
            if ( p._id !== product._id )
            return p;
        
        // Actualizar cantidad
        p.quantity += product.quantity;
            return p;
        });

        dispatch({ 
            type: '[Cart] - Update products in cart', 
            payload: updateProducts 
        });
        console.log(product);
    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
        }}>
            { children }
        </CartContext.Provider>
    )
};