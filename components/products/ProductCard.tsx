import { FC } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material'

import { IProduct } from '../../interfaces'

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    return (
      <Grid item 
            xs={12} 
            sm={12} 
            md={4} 
            lg={4}
      >
          <Card sx={{
            transition: '0.2',
            "&:hover": {
              transform: 'scale(1.05)'
            },
          }}
          >
              <NextLink legacyBehavior href="/product/slug" passHref prefetch={ false }>
                <Link>
                    <CardActionArea>
                        <CardMedia 
                            component='img'
                            className='fadeIn'
                            image={ `products/${ product.images[0] }`}
                            alt={ product.title }
                        />

                    </CardActionArea>
                </Link>
              </NextLink>
              
          </Card>

          <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700}>{ product.title }</Typography>
              <Typography fontWeight={500}>{ `$${product.price}` }</Typography>
          </Box>
      </Grid>
    )
}