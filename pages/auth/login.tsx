import NextLink from 'next/link';
import { AuthLayout } from "@/components/layouts"
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"

const loginPage = () => {
  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{ width: 350, padding:'10px 30px'}}>

        <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography>Correo electrónico</Typography>
                    <TextField label="Correo electrónico" variant="filled" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <Typography>Contraseña</Typography>
                    <TextField label="Contraseña" type="password" variant="filled" fullWidth/>
                </Grid>

                <Grid item xs={12}> 
                    <Button color="secondary" className="circular-btn" size="large" fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink legacyBehavior href="/auth/register" passHref>
                        
                        <Link>
                        ¿Eres un cliente nuevo?&nbsp;
                        <Box 
                            component="span" 
                            style={{ textDecoration: 'underline' }}>
                                Empieza aquí.
                            </Box>

                        </Link>
                    </NextLink>
                </Grid>
        </Grid>

        </Box> 
    </AuthLayout>
  )
}

export default loginPage;
