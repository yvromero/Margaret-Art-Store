import { useState, useContext } from 'react';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { useRouter } from 'next/router';



type FormData = {
    email   : string,
    password: string,
};


const LoginPage = () => {

    const router = useRouter();
    const { loginUser } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false);

        const isValidLogin = await loginUser( email, password );

        if ( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }


        // Todo: navegar a la pantalla que el usuario estaba
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);

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
                            <NextLink 
                                legacyBehavior 
                                href={ router.query.p ? `/auth/register?p=${ router.query.p }` : `/auth/register` }
                                passHref
                            >
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
export default LoginPage;
