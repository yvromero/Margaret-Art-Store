import type { NextPage } from 'next';
import { useProducts } from '../hooks';
import { Typography,Box } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

import { useSession } from 'next-auth/react';


const HomePage: NextPage = () => {

  const { data: session } = useSession();
  const { products, isLoading } = useProducts ('/products');

  return (

      <ShopLayout 
          title={'Margaret Art Store'} 
          pageDescription={'El arte tiene que estar accesible para todos.'}
      >

      <Box display="flex" justifyContent={'end'}>
          {session && session.user ? (
          <Typography variant="body1">
              ¡Hola,{' '}
              <span style={{ color: 'darkslategray', fontWeight: 'bold' }}>
                  {session.user.name}
              </span>
              !
          </Typography>
              ) : null}
      </Box>


        <Typography variant='h1' component='h1'>GALERIA</Typography>
        <Typography variant='h2' sx={{ mb:2 }}>Todos los cuadros</Typography>

        {/* <FullScreenLoading /> */}
        {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
        }


      </ShopLayout>
  )
}

export default HomePage;
