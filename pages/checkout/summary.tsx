import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { Box, Button, Card, CardContent, Checkbox, Chip, Divider, FormControlLabel, Grid, Link, Typography } from "@mui/material";
import GradingIcon from '@mui/icons-material/Grading';
import { CartContext } from '@/context';
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { ErrorOutline } from '@mui/icons-material';




const SummaryPage = () => {

    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );
    const router = useRouter();


    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [checkboxErrorMessage, setCheckboxErrorMessage] = useState('');



    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);


    const handleCheckboxChange = () => {
        setChecked(!isChecked);
        setCheckboxErrorMessage(''); // Ocultar el mensaje de error al marcar la casilla
    };


    // Crear funcion para llamar al createOrder
    const onCreateOrder = async () => {
        setIsPosting(true);

        if (!isChecked) {
        // Verificar si la casilla está marcada antes de continuar
            setIsPosting(false);
            setCheckboxErrorMessage('Debes aceptar los términos y condiciones');
            return;
        }

        const { hasError, message } = await createOrder();

        //Crear condiciones para el error en la confirmacion de la orden
        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }

        // Resetear los estados si la orden se crea exitosamente
        setIsPosting(false);
        setErrorMessage('');
        setChecked(false);

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

            <Grid  container sx={{ mt: 3}}>
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
                        <Divider sx={{ my:2 }} />

                        <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                            <Button 
                                startIcon={ <GradingIcon/> }
                                variant='contained'
                                color="secondary" 
                                className='circular-btn' 
                                fullWidth
                                onClick={ onCreateOrder }
                                disabled={isPosting || !!checkboxErrorMessage || !!errorMessage}
                            >
                                CONFIRMAR ORDEN
                            </Button>

                        </Box>
                        <FormControlLabel
                            control={<Checkbox 
                                checked={isChecked} 
                                onChange={handleCheckboxChange}
                                size="small"
                                    />}
                            label=
                                {<span style={{ fontSize: '0.8rem', color: '#888'}}>
                                    Acepto los{' '}
                                    <NextLink 
                                        legacyBehavior 
                                        href="/customers/terms-conditions" passHref>
                                        <Link 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            style={{ color: '#888', textDecoration: 'underline' }}>
                                        términos y condiciones.
                                        </Link>
                                    </NextLink>
                                </span>} 
                        />
                        <Chip
                            icon={ <ErrorOutline/> }
                            className="fadeIn"
                            color="error"
                            label={checkboxErrorMessage || errorMessage}
                            sx={{ display: (!!checkboxErrorMessage || !!errorMessage) ? 'flex' : 'none', mt: 2 }}
                        />
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '16px',
                                mt: 1,
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
                                backgroundColor: '#f0f0f0', 
                            }}
                        >
                            <Typography variant='body2' >
                            Al confirmar tu orden, serás redirigido a la pasarela de pago según tu elección (PayPal o tarjeta). 
                            El contrato de compra se formalizará tras el envío de un correo notificándote la recepción del pago.
                            </Typography>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
            
        </Grid>
        </ShopLayout >
    )
}

export default SummaryPage;
