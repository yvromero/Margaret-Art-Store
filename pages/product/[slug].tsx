import { useState, useContext } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Grid, Typography, Box, Button, Chip } from '@mui/material';

import { CartContext } from '@/context';

import { ShopLayout } from "@/components/layouts";
import { ItemCounter, ProductMagnify } from "@/components/ui";

import { dbProducts } from "@/database";
import { ICartProduct, IProduct } from "@/interfaces";


interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter();
  const { addProductToCart } = useContext( CartContext )

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
  })

  // 
  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {

    // Llamar a la accion del context para add al carrito
    addProductToCart( tempCartProduct );
    // console.log({ tempCartProduct });
    router.push('/cart');


  }

  
  return (
    
    <ShopLayout title={product.title} pageDescription={product.description}>
        {/* <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 100px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        ></Box> */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* ImageZoom */}
          <ProductMagnify images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box sx={{ mt: 1 }} display='flex' flexDirection='column'>
            {/* titulos */}
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography
              variant='subtitle1'
              component='h2'
            >{`$${product.price}`}</Typography>

            {/* Descripcion */}
            <Box sx={{ my: 3, mt: 1 }}>
              <Typography variant='subtitle2'>
                Descripción de la obra
              </Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

            {/* Cantidad */}
            {/* <Box sx={{ my: 3 }}>
              <Typography variant='subtitle2'>Cantidad</Typography> */}

              {/* <h1>{product.inStock}</h1> */}

              {/* ItemCounter */}
              {/* <ItemCounter 
                currentValue={ tempCartProduct.quantity }
                updateQuantity={ onUpdateQuantity }
                maxValue={ product.inStock }
                // maxValue={ product.inStock > 2 ? 2: product.inStock }
              /> */}
            {/* </Box> */}

            {/* Agregar al carrito */}
            {
              (product.inStock > 0 )
              ?(
                <Button 
                  variant='outlined'
                  color='primary' 
                  className='circular-btn'
                  onClick={ onAddProduct }
                >
                  Agregar al carrito
                </Button>

              )
              :(
                <Chip label="No disponible" color="error" variant="outlined"/>
              )
            }

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Medidas</Typography>
              <Typography variant='body2'>{product.dimensions}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Peso</Typography>
              <Typography variant='body2'>{product.weight}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Material</Typography>
              <Typography variant='body2'>{product.materials}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Enmarcado</Typography>
              <Typography variant='body2'>{product.framed}</Typography>
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
    revalidate: 60
  }
}

export default ProductPage;