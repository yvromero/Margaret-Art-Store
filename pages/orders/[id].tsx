import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";

import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage = ({ order }) => {

    console.log({ order });

    return (
        <ShopLayout title='Resumen de la orden 12314384234' pageDescription={'Resumen de la orden'}>
            <Typography variant='subtitle1' component='h1'
            >
                ORDEN DE COMPRA: AASDASD
            </Typography>
{/* 
            <Chip
                sx={{ my: 2}}
                label="Orden pendiente de pago"
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined/>}
            /> */}

            <Chip
                sx={{ my: 2}}
                label="Pagado"
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined/>}
            />


            <Grid container sx={{ mt: 3}}>
            <Grid item xs={12} sm={ 7 }>
                <CartList/>
            </Grid>

            <Grid item xs={12} sm={ 5 } > 
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Tu pedido( 3 productos) </Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink legacyBehavior href='/checkout/address' passHref>
                                <Link sx={{ mt: 0.5}} underline='always'>
                                    Modificar datos de envío
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Frank Romero</Typography>
                        <Typography>Primer Presidente</Typography>
                        <Typography>Asuncion</Typography>
                        <Typography>Paraguay</Typography>
                        <Typography>+5953939484</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink legacyBehavior href='/cart' passHref>
                                <Link underline='always'>
                                    Modificar carrito
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary/>

                        <Box sx={{ mt: 2 }}>
                            {/* TODO */}
                            <Button color="secondary" className='circular-btn' fullWidth>
                                PAGAR
                            </Button>
                            <Chip
                                sx={{ my: 2, '& .MuiChip-label': 
                                    {   
                                        fontWeight: "bold"
                                    }
                                }}
                                label="Orden pagada"
                                variant='outlined'
                                color='success'
                                icon={<CreditScoreOutlined/>}
                            />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </ShopLayout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query; 
    const session: any = await getSession ({ req });

    // Validar sesion

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    
    // Validar que la orden exista

    if ( !order ) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }
    // Validar que la orden sea del usuario para mostrar
    
    if ( order.user !== session.user._id ){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}
export default OrderPage;
