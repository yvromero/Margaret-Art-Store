import { FC, useEffect, useState, useReducer, ReactNode } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces';
import Cookie from 'js-cookie';
import { margaretApi } from '@/api';
import axios from 'axios';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}


interface UiProviderProps {
    children: ReactNode; 
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
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


    //Para cargar la direccion en el state

    useEffect(() => {

        if ( Cookie.get('firstName')){
            const shippingAddress = {
        
                firstName     : Cookie.get('firstName') || '',
                lastName      : Cookie.get('lastName') || '',
                documentType  : Cookie.get('documentType') || '',
                documentNumber: Cookie.get('documentNumber') || '',
                country       : Cookie.get('country') || '',
                region        : Cookie.get('region') || '',
                city          : Cookie.get('city') || '',
                address       : Cookie.get('address') || '',
                address2      : Cookie.get('address2') || '',
                zip           : Cookie.get('zip') || '',
                phone         : Cookie.get('phone') || '',
                email         : Cookie.get('email') || '',
            }  

            dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])

    

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

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('documentType',address.documentType);
        Cookie.set('documentNumber',address.documentNumber);
        Cookie.set('country',address.country);
        Cookie.set('region',address.region);
        Cookie.set('city',address.city);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('zip',address.zip);
        Cookie.set('phone',address.phone);
        Cookie.set('email',address.email);
        dispatch({ type: '[Cart] - UpdateAddress from Cookies', payload: address });
    }

    // Crear endpoint para order
    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {


        if ( !state.shippingAddress ) {
            throw new Error('No existe dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart,
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }

        
        try {
            
            const { data } = await margaretApi.post<IOrder>('/orders', body);
            
            // TODO: dispatch vaciar el carrito

            return {
                hasError: false,
                message: data._id!
            }


        } catch (error) {
            if ( axios.isAxiosError( error ) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Ha ocurrido un inconveniente, favor contacte con el administrador'
            }
        }
    }



    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress,

            // Orders
            createOrder,
        }}>
            { children }
        </CartContext.Provider>
    )
};