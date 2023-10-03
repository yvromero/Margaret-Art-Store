import { useContext, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

import { CartContext } from "@/context";
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { useRouter } from 'next/router';



const CartPage = () => {

    const { isLoaded, cart } = useContext( CartContext );
    const router = useRouter();

    useEffect(() => {
        if ( isLoaded && cart.length === 0 ) {
            router.replace('/cart/empty');
        }
    }, [ isLoaded, cart, router ])
    
    // Renderizar la pantalla del cart y mostrar solo Empty Cart
    if ( !isLoaded || cart.length === 0 ) { 
        return (<></>);
    }

    return (
        <ShopLayout title='Carrito' pageDescription={'Carrito de compras de la tienda'}>
            <Typography variant='h1' component='h1'>
                CARRITO DE COMPRA
            </Typography>

            <Grid container sx={{ mt: 3}}>
            <Grid item xs={12} sm={ 7 }>
                <CartList editable/>
            </Grid>
            <Grid item xs={12} sm={ 5 } > 
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen del carrito</Typography>
                        <Divider sx={{ my:1 }} />

                        <OrderSummary/>

                        <Box sx={{ mt: 2 }}>
                            <Button 
                                color="secondary" 
                                className='circular-btn' 
                                fullWidth
                                href='/checkout/address'
                            >
                                CHECKOUT
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </ShopLayout >
    )
}

export default CartPage
