import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';

import { AuthLayout } from "@/components/layouts";


type FormData = {
    email   : string,
    password: string,
};

const loginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    // console.log({errors});
    const onLoginUser = ( data: FormData ) => {
        console.log({data});
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                <Box sx={{ width: 350, padding:'10px 30px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Correo electrónico</Typography>
                            <TextField
                                type="email"
                                label="Correo electrónico" 
                                variant="filled" 
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido'
                                })
                                }
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Contraseña</Typography>
                            <TextField
                                label="Contraseña" 
                                type="password" 
                                variant="filled" 
                                fullWidth
                                {...register('password',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 8, message: 'Mínimo 8 caracteres' }
                                })
                                }
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}> 
                            <Button 
                                type="submit"
                                color="secondary" 
                                className="circular-btn" 
                                size="large" 
                                fullWidth
                            >
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
            </form>
        </AuthLayout>
    )
}

export default loginPage;
