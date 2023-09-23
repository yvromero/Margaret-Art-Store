import type { NextPage, GetServerSideProps } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';


interface Props {
    products: IProduct[];
}


const SearchPage: NextPage<Props> = ({ products }) => {

    return (
        <ShopLayout 
            title={'Margaret Art Store - Search'} 
            pageDescription={'El arte tiene que estar accesible para todos.'}
        >
            <Typography variant='h1' component='h1'>Buscar productos</Typography>
            <Typography variant='h2' sx={{ mb:2 }}>ABC-123</Typography>

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

    // no hay productos
    let products = await dbProducts.getProductsByTerm( query );

    // TODO: retornar otros productos

    return {
        props: {
            products
        }
    }
}
export default SearchPage;

