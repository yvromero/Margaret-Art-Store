import { ShopLayout } from '@/components/layouts';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
const Home: NextPage = () => {
  return (

      <ShopLayout title={'Margaret Art Store - Home'} 
      pageDescription={'El arte tiene que estar accesible para todos.'} >
        <Typography variant='h1' component='h1'>E-Store</Typography>
        <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>
      </ShopLayout>
  )
}

export default Home;
