import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';


interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    return (
        <ShopLayout 
            title={'Margaret Art Store - Search'} 
            pageDescription={'Encuentra preciosos cuadros al óleo en Margaret Art Store'}
        >
            <Typography variant='h1' component='h1' sx={{ mb: 2 }}>Buscar cuadros</Typography>
            
            {
                foundProducts
                ?
                <Box display='flex'>
                    <Typography variant='h2' sx={{ mb:2 }}>Búsqueda:</Typography>
                    <Typography variant='h2' sx={{ ml:1, fontWeight: 'bold' }} color="primary" textTransform="capitalize">{ query }</Typography>
                </Box>
                : 
                (
                <Box
                display='flex'
                flexDirection={{ xs: 'column', sm: 'row' }}
                >
                    <Typography variant='h2' sx={{ mb:2 }}>No encontramos ningún cuadro con la palabra:</Typography>
                    <Typography variant='h2' sx={{ ml:1, fontWeight: 'bold'}} color="primary" textTransform="capitalize">{ query }</Typography>
                </Box>
                )
            }

            <ProductList products={ products }/>
        </ShopLayout>
    )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = ''} = params as { query: string }; 
    
    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // Si no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // Retornar otros productos

    if ( !foundProducts ) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}
export default SearchPage;

