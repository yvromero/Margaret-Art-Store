import NextLink from 'next/link';
import RemoveShoppingCartOutlined from '@mui/icons-material/RemoveShoppingCartOutlined';

import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';

const EmptyPage = () => {
  return (
    <ShopLayout
        title="El carrito está vacío"
        pageDescription="No hay productos en el carrito de compras">

        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100}}/>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>El carrito está vacío</Typography>
                <NextLink legacyBehavior href='/' passHref>
                    <Link typography="h6" color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
    );
};

export default EmptyPage;
