import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '@/components/ui';


const SearchPage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products');

  return (

      <ShopLayout 
          title={'Margaret Art Store - Search'} 
          pageDescription={'El arte tiene que estar accesible para todos.'}
      >
        <Typography variant='h1' component='h1'>Buscar producto</Typography>
        <Typography variant='h2' sx={{ mb:2 }}>ABC-123</Typography>


        {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
        }


      </ShopLayout>
  )
}

export default SearchPage;
