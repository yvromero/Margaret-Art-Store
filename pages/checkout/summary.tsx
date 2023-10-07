import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";

import { CartContext } from '@/context';
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { ErrorOutline } from '@mui/icons-material';




const SummaryPage = () => {

    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );
    const router = useRouter();


    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);

    // Crear funcion para llamar al createOrder

    const onCreateOrder = async () => {
        setIsPosting(true);

        const { hasError, message } = await createOrder();

        //Crear condiciones para el error en la confirmacion de la orden
        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }

        router.replace(`/orders/${ message }`);
    }

    if ( !shippingAddress ) {
        return<></>;
    }

    const { firstName, lastName, documentType, documentNumber, address, address2 = '', city, zip, country, phone, email } = shippingAddress;

    return (
        <ShopLayout title='Tu pedido' pageDescription={'Revisar pedido y confirmar la orden de pedido'}>
            <Typography variant='subtitle1' component='h1'>
                RESUMEN DE LA ORDEN
            </Typography>

            <Grid container sx={{ mt: 3}}>
            <Grid item xs={12} sm={ 7 }>
                <CartList/>
            </Grid>

            <Grid item xs={12} sm={ 5 } > 
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Tu pedido ({numberOfItems} { numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink legacyBehavior href='/checkout/address' passHref>
                                <Link sx={{ mt: 0.5}} underline='always'>
                                    Modificar datos de envío
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>{ firstName } { lastName }</Typography>
                        <Typography>{ documentType ? `${ documentType }:` : ''} { documentNumber }</Typography>
                        <Typography>{ address }{ address2 ? `, ${ address2 }` : ''}</Typography>
                        <Typography>{ city } { zip }</Typography>
                        <Typography>{ country }</Typography>
                        {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
                        <Typography>{ email }</Typography>
                        <Typography>{ phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink legacyBehavior href='/cart' passHref>
                                <Link underline='always'>
                                    Modificar carrito
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary/>

                        <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
                            <Button 
                                color="secondary" 
                                className='circular-btn' 
                                fullWidth
                                onClick={ onCreateOrder }
                                disabled={ isPosting }
                            >
                                CONFIRMAR ORDEN
                            </Button>
                            <Chip
                                icon={ <ErrorOutline/> }
                                className="fadeIn"
                                color="error"
                                label={ errorMessage }
                                sx={{ display: errorMessage ? 'flex':'none', mt: 2}}
                            />

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </ShopLayout >
    )
}

export default SummaryPage;
