import type { NextPage } from 'next';
import { useProducts } from '../hooks';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';


const HomePage: NextPage = () => {


  const { products, isLoading } = useProducts ('/products');

  return (

      <ShopLayout 
          title={'Margaret Art Store'} 
          pageDescription={'El arte tiene que estar accesible para todos.'}
      >
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
