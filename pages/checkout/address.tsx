import { ShopLayout } from "@/components/layouts";
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";


const AddressPage = () => {
  return (
    <ShopLayout title={"Datos de facturación y envío"} pageDescription={"Dirección de envío del producto"} >
        <Typography variant='h2' component='h1'>Datos de facturación y envío</Typography>

        <Grid container spacing={ 2 } sx={{ mt:1}}>
            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Apellido' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Tipo de documento' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Numero de documento' variant="filled" required fullWidth/>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant="filled"
                        label="País"
                        value={1}
                    >
                        <MenuItem value={1}>Paraguay</MenuItem>
                        <MenuItem value={2}>Argentina</MenuItem>
                        <MenuItem value={3}>Brasil</MenuItem>
                        <MenuItem value={4}>Bolivia</MenuItem>
                        <MenuItem value={5}>Chile</MenuItem>
                        <MenuItem value={6}>Espanha</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Provincia/Región' required variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección 2' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Prefijo' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Móvil' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Email' variant="filled" required fullWidth/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='body2' sx={{ mt: 1 }}>
            Es importante que introduzcas tu número de móvil, ya que recibirás un SMS el día que se realice la entrega de la obra.* Campos obligatorios
            </Typography>
            </Grid>
        </Grid>
        <Box sx={{mt: 5 }} display='flex' justifyContent='center'>
                <Button color="secondary" className="circular-btn" size="large">
                    Revisar Pedido
                </Button>
            </Box>
    </ShopLayout>
  )
}

export default AddressPage;