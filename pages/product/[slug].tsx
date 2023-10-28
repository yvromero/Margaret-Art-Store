import { useState, useContext, useEffect } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Grid, Typography, Box, Button, Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BlockIcon from '@mui/icons-material/Block';

import { CartContext } from '@/context';

import { ShopLayout } from "@/components/layouts";
import {  ProductMagnify } from "@/components/ui";

import { dbProducts } from "@/database";
import { ICartProduct, IProduct } from "@/interfaces";



interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter();

  const { addProductToCart, cart } = useContext(CartContext); 
  const [isProductInCart, setIsProductInCart] = useState(false);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    framed: product.framed,
    dimensions: product.dimensions,
    slug: product.slug,
    title: product.title,
    category: product.category,
    quantity: 1,
  });

  useEffect(() => {
    // Verificar si el producto ya existe en el carrito
    const isProductInCart = cart.some((item) => item._id === tempCartProduct._id);
    setIsProductInCart(isProductInCart);
  }, [cart, tempCartProduct]);

  const onAddProduct = () => {

    // Llamar a la accion del context para add al carrito
    addProductToCart( tempCartProduct )
    // console.log({ tempCartProduct });
    router.push('/cart');
  }

  
  return (
    
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} style={{ marginTop: '20px' }}>
          {/* ImageZoom */}
          <ProductMagnify images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box sx={{ mt: 2.5 }} display='flex' flexDirection='column'>
            {/* titulos */}
            <Typography variant='h1' component='h1' sx={{ ml:1}}>
              {product.title}
            </Typography>
            <Typography
              variant='subtitle1'
              component='h2'
              sx={{ ml:1}}
            >{`$${product.price}`}</Typography>

            {/* Descripcion */}
            <Box sx={{ my: 3, mt: 2 }}>
              <Typography variant='subtitle2' sx={{ ml:1, fontWeight: 'bold' }}>
                Descripción de la obra
              </Typography>
              <Typography variant='body2' sx={{ ml:1 }}>{product.description}</Typography>
            </Box>

            {/* Agregar al carrito */}
            {
              (product.inStock > 0 )
              ?(
                <Button
                  startIcon={ <AddShoppingCartIcon/> }
                  variant='contained'
                  sx={{ ml:1, fontWeight: 'bold' }}
                  color='secondary' 
                  className='circular-btn'
                  disabled={isProductInCart}
                  onClick={ onAddProduct }
                >
                  Agregar al carrito
                </Button>

              )
              :(
                <Chip 
                  label="No disponible" 
                  color="error" 
                  variant="outlined"
                  icon={ <BlockIcon /> }
                />
              )
            }

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2' sx={{ ml:1, fontWeight: 'bold' }}>Medidas</Typography>
              <Typography variant='body2' sx={{ ml:1 }}>{product.dimensions}</Typography>
            </Box>

            {/* <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Peso</Typography>
              <Typography variant='body2'>{product.weight}</Typography>
            </Box> */}

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2' sx={{ ml:1, fontWeight: 'bold' }}>Material</Typography>
              <Typography variant='body2' sx={{ ml:1 }}>{product.materials}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2' sx={{ ml:1, fontWeight: 'bold' }}>Enmarcado</Typography>
              <Typography variant='body2' sx={{ ml:1 }}>{product.framed}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({slug}) => ({
      params: { slug }
    })),
    //fallback: false
    fallback: 'blocking'
  }
}

// getStaticsProps...
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = ''} = params as { slug: string };
  const product =  await dbProducts.getProductBySlug(slug);

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
      product
    },
    revalidate: 120
  }
}

export default ProductPage;