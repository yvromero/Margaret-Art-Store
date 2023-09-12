import type { NextPage } from 'next';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { initialData } from '@/database/products';


const Home: NextPage = () => {
  return (

      <ShopLayout 
          title={'Margaret Art Store'} 
          pageDescription={'El arte tiene que estar accesible para todos.'}
      >
        <Typography variant='h1' component='h1'>GALERIA</Typography>
        <Typography variant='h2' sx={{ mb:1 }}>Todos los cuadros</Typography>


        <Grid container spacing={4}>
          {
            initialData.products.map( product =>(
              <Grid item xs={12} sm={12} md={4} lg={4} key={ product.slug }>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      image={`products/${ product.images[0] }` }
                      alt={ product.title }
                      style={{ alignSelf: 'center', maxWidth: '100%', maxHeight:'100%', borderRadius: '8px'}}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>

      </ShopLayout>
  )
}

export default Home;
