

import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '@/components/ui';


const AbstractoContemporaneoPage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products?category=abstracto-contemporaneo');

  return (

      <ShopLayout 
          title={'Abstracto y Contemporáneo'} 
          pageDescription={'Pinturas al óleo sobre Abstracto y Contemporáneo.'}
      >
        <Typography variant='h1' component='h1'>Pinturas al óleo</Typography>
        <Typography variant='h2' sx={{ mb:2 }}>Abstracto y Contemporáneo</Typography>


        {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
        }


      </ShopLayout>
  )
}

export default AbstractoContemporaneoPage;
