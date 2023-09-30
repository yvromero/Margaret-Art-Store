import { useState } from 'react';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { margaretApi } from '@/api';


import { AuthLayout } from "@/components/layouts";
import { validations } from '@/utils';


type FormData = {
    name    : string,
    email   : string,
    password: string,
};


const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);


    const onRegisterForm = async ( {name, email, password} : FormData ) => {

        console.log({onRegisterForm});

        setShowError(false);

        try {
            const { data } = await margaretApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            console.log({ token, user });

        } catch (error) {
            console.log('Error en las credenciales');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            
        }

    }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
            <Box sx={{ width: 350, padding:'10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Crear cuenta</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography>Tu nombre</Typography>
                        <TextField 
                            label="Nombres y apellidos" 
                            variant="filled" 
                            fullWidth
                            {...register('name',{
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })
                            }
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Correo electrónico</Typography>
                        <TextField 
                            type="email"
                            label="Ejemplo: juan@gmail.com" 
                            variant="filled" 
                            fullWidth 
                            {...register('email', {
                                required: 'Este campo es requerido',
                                validate: (val) => validations.isEmail(val)
                            })
                            }
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography>Contraseña</Typography>
                        <TextField 
                            label="Como mínimo 6 caracteres" 
                            type='password' 
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
                            className='circular-btn' 
                            size='large' 
                            fullWidth
                        >
                            Crear cuenta
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
                    <Chip
                        label="No se encuentran datos de usuario "
                        color="error"
                        icon={ <ErrorOutline /> }
                        className="fadeIn"
                        sx={{ display: showError ? 'flex': 'none' }}
                    />
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage
