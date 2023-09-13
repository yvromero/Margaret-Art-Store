import { ShopLayout } from "@/components/layouts";
import { initialData } from "@/database/products";
import { Grid, Typography, Box, Button } from '@mui/material';

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={3}>
        <Grid item xs={ 12 } sm={ 7 }>
          {/* Slideshow */}
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>
          
            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
            <Typography variant='subtitle2'>Cantidad</Typography>
            {/* ItemCounter */}
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>


          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export default ProductPage;