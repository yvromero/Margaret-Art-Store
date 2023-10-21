import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
import { ShopLayout } from "@/components/layouts";
import { CartContext } from '@/context';


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
    zip           : string;
    phone         : string;
    email         : string;

}

const getAddressFromCookies = ():FormData => {
    return {
        firstName     : Cookies.get('firstName') || '',
        lastName      : Cookies.get('lastName') || '',
        documentType  : Cookies.get('documentType') || '',
        documentNumber: Cookies.get('documentNumber') || '',
        country       : Cookies.get('country') || '',
        region        : Cookies.get('region') || '',
        city          : Cookies.get('city') || '',
        address       : Cookies.get('address') || '',
        address2      : Cookies.get('address2') || '',
        zip           : Cookies.get('zip') || '',
        phone         : Cookies.get('phone') || '',
        email         : Cookies.get('email') || '',
    }
}


const AddressPage = () => {


    const router = useRouter();
    const { updateAddress } = useContext( CartContext )

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: //getAddressFromCookies()
        {
            firstName     : '',
            lastName      : '',
            documentType  : '',
            documentNumber: '',
            country       : '',
            region        : '',
            city          : '',
            address       : '',
            address2      : '',
            zip           : '',
            phone         : '',
            email         : '',
        }
    });

    useEffect(() => { 
        
        reset(getAddressFromCookies() );
    
    }, [reset])

    const onSubmitAddress = ( data: FormData ) => {

        updateAddress( data );
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
                                InputLabelProps={{ shrink: true }} 
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
                                InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                            {...register('documentNumber',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.documentNumber }
                            helperText={ errors.documentNumber?.message }
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={ 6 }>

                        <TextField
                            variant="filled"
                            label="País"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
    
                            { ...register('country', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.country }
                            helperText={ errors.country?.message }
                        />

                    </Grid>
                
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Provincia/Región' 
                            variant="filled" 
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                            {...register('address2')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Código Postal' 
                            variant="filled"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('zip',{
                                required: 'Este campo es requerido',
                            })
                            }
                            error={ !!errors.zip }
                            helperText={ errors.zip?.message }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            label='Móvil' 
                            variant="filled" 
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                        Es importante que introduzcas tu número de móvil, ya que recibirás un SMS el día que se realice la entrega de la obra.
                        </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{mt: 5 }} display='flex' justifyContent='center'>
                            <Button
                            variant='contained'
                            type="submit" 
                            color="secondary" 
                            className="circular-btn" 
                            size="large">
                                Revisar Pedido
                            </Button>
                    </Box>
            </form>
        </ShopLayout>
    )
}

export default AddressPage;
