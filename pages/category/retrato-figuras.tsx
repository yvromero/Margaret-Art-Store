

import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '@/components/ui';


const RetratoFigurasPage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products?category=retrato-figuras');

  return (

      <ShopLayout 
          title={'Retrato y Figuras'} 
          pageDescription={'Pinturas al óleo sobre Retrato y Figuras.'}
      >
        <Typography variant='h1' component='h1'>Pinturas al óleo</Typography>
        <Typography variant='h2' sx={{ mb:2 }}>Retrato y Figuras</Typography>


        {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
        }


      </ShopLayout>
  )
}

export default RetratoFigurasPage;
