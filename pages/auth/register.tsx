import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from "@/components/layouts";

const RegisterPage = () => {
  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography>Tu nombre</Typography>
                    <TextField label="Nombres y apellidos" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Correo electrónico</Typography>
                    <TextField label="Ejemplo: juan@gmail.com" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                <Typography>Contraseña</Typography>
                    <TextField label="Como mínimo 6 caracteres" type='password' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink legacyBehavior href="/auth/login" passHref>
                        <Link>
                        ¿Ya tienes una cuenta?&nbsp;
                            <Box 
                                component="span" 
                                style={{ textDecoration: 'underline' }}>
                            Iniciar sesión.
                            </Box>
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage
