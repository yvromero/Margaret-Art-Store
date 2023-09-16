import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";

import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";


const SummaryPage = () => {
    return (
        <ShopLayout title='Tu pedido' pageDescription={'Revisar pedido y confirmar la orden de pedido'}>
            <Typography variant='h1' component='h1'>
                Resumen de la orden
            </Typography>

            <Grid container sx={{ mt: 3}}>
            <Grid item xs={12} sm={ 7 }>
                <CartList/>
            </Grid>

            <Grid item xs={12} sm={ 5 } > 
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Tu pedido(3 productos)</Typography>
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
                            <Button color="secondary" className='circular-btn' fullWidth>
                                PLACE HOLDER
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </ShopLayout >
  )
}

export default SummaryPage;
