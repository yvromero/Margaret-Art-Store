import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ShopLayout } from "@/components/layouts";
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";

import { jwt, countries} from '@/utils';
import { useForm } from 'react-hook-form';

type FormData = {
    firstName     : string;
    lastName      : string;
    documentType  : string;
    documentNumber: string;
    country       : string;
    region        : string;
    city          : string;
    address       : string;
    address2?     : string;
    prefix        : string;
    phone         : string;
    email         : string;

}


const AddressPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            documentType: '',
            documentNumber: '',
            country: countries[0].code,
            region: '',
            city: '',
            address: '',
            address2: '',
            prefix: '',
            phone: '',
            email: '',
        }
    });

    const onSubmitAddress = ( data: FormData ) => {
        console.log(data);
        Cookies.set('firstName',data.firstName);
        Cookies.set('lastName',data.lastName);
        Cookies.set('documentType',data.documentType);
        Cookies.set('documentNumber',data.documentNumber);
        Cookies.set('country',data.country);
        Cookies.set('region',data.region);
        Cookies.set('city',data.city);
        Cookies.set('address',data.address);
        Cookies.set('address2',data.address2 || '');
        Cookies.set('prefix',data.prefix);
        Cookies.set('phone',data.phone);
        Cookies.set('email',data.email);

        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title={"Datos de facturación y envío"} pageDescription={"Dirección de envío del producto"} >
           <form onSubmit={ handleSubmit(onSubmitAddress) }>
                    <Typography variant='h2' component='h1'>Datos de facturación y envío</Typography>

                    <Grid container spacing={ 2 } sx={{ mt:1}}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Nombre' 
                                variant="filled" 
                                fullWidth
                                {...register('firstName',{
                                    required: 'Este campo es requerido',
                                })
                                }
                                error={ !!errors.firstName }
                                helperText={ errors.firstName?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Apellido' 
                                variant="filled" 
                                fullWidth
                                {...register('lastName',{
                                    required: 'Este campo es requerido',
                                })
                                }
                                error={ !!errors.lastName }
                                helperText={ errors.lastName?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Tipo de documento' 
                            variant="filled" 
                            fullWidth
                            {...register('documentType',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.documentType }
                            helperText={ errors.documentType?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Numero de documento' 
                            variant="filled" 
                            fullWidth
                            {...register('documentNumber',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.documentNumber }
                            helperText={ errors.documentNumber?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField
                                    select
                                    variant="filled"
                                    label="País"
                                    defaultValue={ countries[17].code }
                                    {...register('country',{
                                        required: 'Este campo es requerido',
                                    })
                                    }
                                    error={ !!errors.country }
                                    // helperText={ errors.country?.message }
                                >
                                    {
                                        countries.map( country => (
                                            <MenuItem
                                            key={ country.code }
                                            value={ country.code }
                                            >{ country.name }
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Provincia/Región' 
                            variant="filled" 
                            fullWidth
                            {...register('region',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.region }
                            helperText={ errors.region?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Ciudad' 
                            variant="filled" 
                            fullWidth
                            {...register('city',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Dirección' 
                            variant="filled" 
                            fullWidth
                            {...register('address',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Dirección 2' 
                            variant="filled" 
                            fullWidth
                            {...register('address2')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Prefijo' 
                            variant="filled"
                            fullWidth
                            {...register('prefix',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.prefix }
                            helperText={ errors.prefix?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Móvil' 
                            variant="filled" 
                            fullWidth
                            {...register('phone',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.phone }
                            helperText={ errors.documentType?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Email' 
                            variant="filled" 
                            fullWidth
                            {...register('email',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant='body2' sx={{ mt: 1 }}>
                        Es importante que introduzcas tu número de móvil, ya que recibirás un SMS el día que se realice la entrega de la obra.* Campos obligatorios
                        </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{mt: 5 }} display='flex' justifyContent='center'>
                            <Button type="submit" color="secondary" className="circular-btn" size="large">
                                Revisar Pedido
                            </Button>
                    </Box>
            </form>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = ''} = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return { 
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }
    return {
        props: {
            
        }
    }
}

export default AddressPage;
