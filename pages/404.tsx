import { ShopLayout } from '../components/layouts';
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout 
    title= 'Page not found' 
    pageDescription='No hay nada que mostrar aqui'>

    <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
        sx={{ flexDirection : { xs: 'column', sm: 'column', md: 'row'}}}
    >
      <Typography variant='h2' component='h2' fontSize={60} fontWeight={160}>404 |</Typography>
      <Typography marginLeft={2}>¡Vaya! No pudimos encontrar la página.</Typography>
    </Box>

  </ShopLayout>
  
  )
}

export default Custom404;
