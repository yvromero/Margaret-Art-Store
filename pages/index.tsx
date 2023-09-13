import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { initialData } from '@/database/products';
import { ProductList } from '@/components/products';
import { IProduct } from '@/interfaces';



const Home: NextPage = () => {
  return (

      <ShopLayout 
          title={'Margaret Art Store'} 
          pageDescription={'El arte tiene que estar accesible para todos.'}
      >
        <Typography variant='h1' component='h1'>GALERIA</Typography>
        <Typography variant='h2' sx={{ mb:1 }}>Todos los cuadros</Typography>

        <ProductList 
          products={ initialData.products as any }
        />
      </ShopLayout>
  )
}

export default Home;
