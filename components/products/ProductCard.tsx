import { FC, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from '@mui/material';

import { IProduct } from '../../interfaces'

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isImageloaded, setIsImageLoaded] = useState(false);

    return (
      <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card

              sx={{
                transition: '0.1s',
                "&:hover":
                  {
                    transform: 'scale(1.15)'
                  },
              }}
          >
            <NextLink legacyBehavior href={`/product/${ product.slug }`} passHref prefetch={ false }>
              <Link>
                <CardActionArea>
                  {
                    (product.inStock === 0 ) && (
                      <Chip
                        color="primary"
                        label="Vendido"
                        sx={{ position: 'absolute', zIndex:999, top:'10px', right: '10px'}}
                      />
                    )
                  }
                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image= { product.images[0] }

                        alt={ product.title }
                        onLoad={ () => setIsImageLoaded(true)}
                        sx={{
                          maxWidth: '100%',
                          height: 200,
                          objectFit: 'cover',
                        }}
                      />
                  </CardActionArea>
                </Link>
              </NextLink>
          </Card>

          <Box sx={{ mt: 1.6, display: isImageloaded ? 'block' : 'none' }} className='fadeIn'>
              <Typography fontWeight={700}>{ product.title }</Typography>
              <Typography fontWeight={500}>{ `$${product.price}` }</Typography>
          </Box>
      </Grid>
    )
}