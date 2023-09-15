import NextLink from 'next/link';
import { initialData } from "@/database/products";
import { CardActionArea, CardMedia, Link, Grid, Box, Typography, Button } from "@mui/material";
import { ItemCounter } from '../ui';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export const CartList = () => {

  return (
    <>
        {
            productsInCart.map( product => (
              <Grid container spacing={1} key={ product.slug } sx={{ mb: 3}}>
                <Grid item xs={3}>
                  {/* Todo llevar a la page del producto de forma dinamica*/}
                  <NextLink legacyBehavior href="/product/slug" passHref>
                    <Link>
                      <CardActionArea>
                        <CardMedia
                          image={ `products/${ product.images[0] }` }
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

                  {/* Condicional */}
                  <ItemCounter/>
                  </Box>

                </Grid>
                <Grid item xs={2}  display='flex' alignItems='center' flexDirection='column'>
                  <Typography variant='subtitle1'>{ `$${ product.price }`}</Typography>
                {/* Editable */}
                <Button variant='text' color='secondary'>
                  Remover
                </Button>
                </Grid>
              </Grid>
            ))
        }
    </>
  )
}
