import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <ShopLayout title='Resumen de la orden' pageDescription={'Resumen de la orden'}>
            <Typography 
                variant='subtitle1' 
                component='h1'
            >
                ORDEN DE COMPRA: { order._id }
            </Typography>

            {
                !order.isPaid && (
                <Chip
                    sx={{ my: 2 }}
                    label="Orden pendiente de pago"
                    variant='outlined'
                    color='error'
                    icon={<CreditCardOffOutlined/>}
                />
                )
            }

                {/* {
                    order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label="Orden pagada"
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined/>}

                        />
                    ):
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label="Orden pendiente de pago"
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined/>}

                        />
                    )
                } */}




            <Grid container sx={{ mt: 3}} className='fadeIn'>
            <Grid item xs={12} sm={ 7 }>

                <CartList products={ order.orderItems }/>


            </Grid>

            <Grid item xs={12} sm={ 5 } > 
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Tu pedido ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'}) </Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        </Box>

                        <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography>{ shippingAddress.documentType ? `${ shippingAddress.documentType }:` : ''} { shippingAddress.documentNumber }</Typography>
                        <Typography>{ shippingAddress.address }{ shippingAddress.address2 ? `, ${ shippingAddress.address2 }` : ''}</Typography>
                        <Typography>{ shippingAddress.city } { shippingAddress.zip }</Typography>
                        <Typography>{ shippingAddress. country }</Typography>
                        <Typography>{ shippingAddress.email }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <OrderSummary  
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal     : order.subTotal,
                                tax          : order.tax,
                                total        : order.total
                            
                            }}
                        />

                        <Box sx={{ mt: 2 }} display='flex' flexDirection='column'>
                            {
                                order.isPaid
                                ? (
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
                                ): (
                                    <Button color="secondary" className='circular-btn' fullWidth>
                                    PAGAR
                                </Button>
                                )
                            }


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
