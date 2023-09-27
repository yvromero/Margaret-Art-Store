import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { initialData } from '../../database/products';
import { CardActionArea, CardMedia, Link, Grid, Box, Typography, Button } from "@mui/material";
import { ItemCounter } from '../ui';
import { CartContext } from '@/context';




interface Props {
  editable?: boolean;
}

export const CartList:FC<Props> = ({editable = false}) => {

  const { cart } = useContext(CartContext)

  return (
    <>
        {
            cart.map( product => (
              <Grid container spacing={1} key={ product.slug } sx={{ mb: 3}}>
                
                <Grid item xs={3}>
                  {/* Todo llevar a la page del producto de forma dinamica*/}
                  <NextLink legacyBehavior href={`/product/${ product.slug }`} passHref>
                    <Link>
                      <CardActionArea>
                        <CardMedia
                          image={ `/products/${ product.image }` }
                          component='img'
                          sx={{ borderRadius: '7px' }}
                        />
                      </CardActionArea>
                    </Link>
                  </NextLink>
                </Grid>

                <Grid item xs={7} >
                  <Box display='flex' flexDirection='column'>
                    <Typography variant='body1'>{ product.title }</Typography>
                    <Typography variant='body2'>{`${ product.dimensions}`}</Typography>
                  {
                    editable
                    ? (
                        <ItemCounter 
                        currentValue={ product.quantity} 
                        maxValue={ 2 } // Regla de negocio
                        updateQuantity={() => {}}
                        />
                      )
                    : (
                        <Typography variant='body2'>{ product.quantity }
                          { product.quantity > 1 ? 'cuadros':'cuadro' }</Typography>)
                  }
                  </Box>
                </Grid>

                <Grid item xs={2}  display='flex' alignItems='center' flexDirection='column'>
                  <Typography variant='subtitle1'>
                    { `$${ product.price }`}
                  </Typography>
                {
                  editable && (
                    <Button variant='text' color='secondary'>
                    Remover
                  </Button>
                  )
                }
                </Grid>

              </Grid>
            ))
        }
    </>
  )
}
