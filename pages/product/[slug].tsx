import { ShopLayout } from "@/components/layouts";
import { ItemCounter, ProductMagnify } from "@/components/ui";
import { dbProducts } from "@/database";
import { IProduct } from "@/interfaces";
import { Grid, Typography, Box, Button, Chip } from '@mui/material';
import { NextPage, GetServerSideProps } from "next";

interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({product}) => {

  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${ router.query.slug}`);


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* ImageZoom */}
          <ProductMagnify images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* titulos */}
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography
              variant='subtitle1'
              component='h2'
            >{`$${product.price}`}</Typography>

            {/* Descripcion */}
            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>
                Descripción de la obra
              </Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
            {/* Cantidad */}
            <Box sx={{ my: 3 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              {/* ItemCounter */}
              <ItemCounter />
            </Box>

            {/* Agregar al carrito */}
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No disponible" color="error" variant="outlined"/> */}

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


//getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

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
    }
  }
}

export default ProductPage;