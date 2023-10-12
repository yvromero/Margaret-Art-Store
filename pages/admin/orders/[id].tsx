
import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts/AdminLayaout';
import { CartList, OrderSummary } from "@/components/cart";

import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';




interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <AdminLayout 
            title={'Seguimiento'} 
            subTitle={` Detalle de la orden: ${ order._id }`}
            icon={<AirplaneTicketOutlined/>}
        >
            {/* <Typography 
                variant='subtitle1' 
                component='h1'
            >
                ORDEN DE COMPRA: { order._id }
            </Typography> */}

            {/* {
                order.isPaid 
                ?(
                    <Chip
                        sx={{ my: 2 }}
                        label="Orden pagada"
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined/>}
                    />
                )
                :(
                    <Chip
                        sx={{ my: 2 }}
                        label="Orden pendiente de pago"
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined/>}
                    />
                )
            } */}


            <Grid container sx={{ mt: 5}} className='fadeIn'>

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

                            <Box display='flex' flexDirection="column">
                                {
                                    order.isPaid
                                    ?(
                                        <Chip
                                            sx={{ flex: 1, my: 2, '& .MuiChip-label': 
                                                {   
                                                    fontWeight: "bold"
                                                }
                                            }}
                                            label="Orden pagada"
                                            variant='outlined'
                                            color='success'
                                            icon={<CreditScoreOutlined/>}
                                        />
                                    )
                                    :(
                                        <Chip
                                            sx={{  flex: 1, my: 2, '& .MuiChip-label': 
                                                {   
                                                    fontWeight: "bold"
                                                }
                                            }}
                                            label="Orden pendiente de pago"
                                            variant='outlined'
                                            color='error'
                                            icon={<CreditCardOffOutlined/>}
                                        />
                                    )
                                }
                            </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </AdminLayout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query; 
    const order = await dbOrders.getOrderById( id.toString() );

    // Validar que la orden exista

    if ( !order ) {
        return {
            redirect: {
                destination: `/admin/orders/`,
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