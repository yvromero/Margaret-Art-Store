import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';


type FormData = {
    name    : string;
    email   : string;
    password: string;
};


const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext( AuthContext );


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onRegisterForm = async( {  name, email, password }: FormData ) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message || '' );
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        
    // Todo: navegar a la ultima pantalla antes del register
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);

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
                                label="Como mínimo 8 caracteres" 
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
                            <NextLink 
                                legacyBehavior 
                                href={ router.query.p ? `/auth/login?p=${ router.query.p }` : `/auth/login` }
                                passHref
                            >
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
                            label="No se encuentran datos de usuario"
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
