import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { useRouter } from 'next/router';




type FormData = {
    email   : string,
    password: string,
};


const LoginPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then( prov => {
            // console.log(prov);
            setProviders(prov)
        })
    }, [])

    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false);

        await signIn('credentials',{ email, password });


        // const isValidLogin = await loginUser( email, password );
        // if ( !isValidLogin ) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }
        // // Todo: navegar a la pantalla que el usuario estaba
        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

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
                            label="No se encuentran datos de usuario"
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ display: showError ? 'flex': 'none' }}
                    />

                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                // Object.values( providers ).map(( provider: any ) => {
                                    providers && Object.values(providers).map((provider: any) => {
                                    // console.log({providers});
                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                })
                            }

                        </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query  }) => {
    const session = await getSession({ req });
      // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: { }
    }
}
export default LoginPage;
