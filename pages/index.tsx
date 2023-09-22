import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { useProducts } from '../hooks';


const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products');

  return (

      <ShopLayout 
          title={'Margaret Art Store'} 
          pageDescription={'El arte tiene que estar accesible para todos.'}
      >
        <Typography variant='h1' component='h1'>GALERIA</Typography>
        <Typography variant='h2' sx={{ mb:2 }}>Todos los cuadros</Typography>

        {
          isLoading
          ? <h1>Cargando...</h1>
          : <ProductList products={ products }/>
        }


      </ShopLayout>
  )
}

export default HomePage;
