
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '@/components/ui';


const PaisajesNaturalezaPage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products?category=paisajes-naturaleza');

  return (

      <ShopLayout 
          title={'Paisajes y Naturaleza'} 
          pageDescription={'Pinturas al óleo sobre Paisajes y Naturaleza.'}
      >
        <Typography variant='h1' component='h1'>Pinturas al óleo</Typography>
        <Typography variant='h2' sx={{ mb:2 }}>Paisajes y Naturaleza</Typography>


        {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
        }


      </ShopLayout>
  )
}

export default PaisajesNaturalezaPage;
