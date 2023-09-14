import { ShopLayout } from "@/components/layouts";
import { ProductMagnify } from "@/components/ui";

import { initialData } from "@/database/products";
import { Grid, Typography, Box, Button, Chip } from '@mui/material';


const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={3}>
        <Grid item xs={ 12 } sm={ 7 }>
          
          {/* ImageZoom */}
          <ProductMagnify
            images={ product.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>
          
            {/* Cantidad */}
            <Box sx={{ my: 4 }}>
            <Typography variant='subtitle2'>Cantidad</Typography>
            {/* ItemCounter */}
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            {/* <Chip label="No disponible" color="error" variant="outlined"/> */}
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Medidas</Typography>
              <Typography variant="body2">{ product.dimensions }</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Peso</Typography>
              <Typography variant="body2">{ product.weight }</Typography>
            </Box>

            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Material</Typography>
              <Typography variant="body2">{ product.materials }</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Enmarcado</Typography>
              <Typography variant="body2">{ product.framed }</Typography>
            </Box>

            {/* Descripcion */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Descripción de la obra</Typography>
              <Typography variant="body2">{ product.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export default ProductPage;