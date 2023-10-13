import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';


const validTheme  = [
    'Natura',
    'Urbano',
    'Rural',
    'Marino',
    'Floral',
    'Bodegones',
    'Animales',
    'Vistoso'
]
const validCategory = [
    'paisajes-naturaleza',
    'retrato-figuras',
    'abstracto-contemporaneo'
]

interface FormData {
    _id?        : string;
    description : string;
    images      : string[];
    inStock     : number;
    price       : number;
    framed      : string;
    dimensions  : string;
    weight      : string;
    slug        : string;
    tags        : string[];
    title       : string;
    materials   : string;
    theme       : string;
    category    : string;
}



interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    useEffect(() => {
        const subscription = watch(( value, { name, type }) => {
            console.log({value, name, type});
            if ( name === 'title') {
                const newSLug = value.title?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLocaleLowerCase() || '';

                setValue('slug', newSLug);
            }
        });
    
        return () => subscription.unsubscribe()
    }, [watch, setValue])
    

    const onDeleteTag = ( tag: string ) => {

    }

    const onSubmit = ( form: FormData ) => {
        console.log(form);
    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editar: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 3 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            rows={5} // Solución al problema de re-renders, si vuelve a salir agregar mas rows (6 ó 7)
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'No disponible' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Valor del producto según disponibilidad' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <TextField
                            label="Dimensión"
                            type='string'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('dimensions', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Example:12x30cm' }
                            })}
                            error={ !!errors.dimensions }
                            helperText={ errors.dimensions?.message }
                        />

                        <TextField
                            label="Peso"
                            type='string'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('weight', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Example:0.800g' }
                            })}
                            error={ !!errors.weight }
                            helperText={ errors.weight?.message }
                        />

                        <TextField
                            label="Materiales"
                            type='string'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('materials', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Example:0.800g' }
                            })}
                            error={ !!errors.materials }
                            helperText={ errors.materials?.message }
                        />

                        <TextField
                            label="Enmarcado"
                            type='boolean'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('framed', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.framed }
                            helperText={ errors.framed?.message }
                        />

                        <Divider sx={{ my: 3 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Categoría</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('category') }
                                onChange={ ({ target })=> setValue('category', target.value, {shouldValidate: true}) }
                            >
                                {
                                    validCategory.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tema</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('theme') }
                                onChange={ ({ target })=> setValue('theme', target.value, {shouldValidate: true}) }
                            >
                                {
                                    validTheme.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede contener espacios en blanco':undefined 
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                product.tags.map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 3 }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:2}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                            >
                                Cargar imagen
                            </Button>

                            <Chip 
                                label="Se requiere la carga de una imagen"
                                color='error'
                                variant='outlined'
                                icon={ <InsertPhotoIcon/> }
                            />

                            <Grid 
                                container 
                                spacing={1}
                            >
                                {
                                    product.images.map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `/products/${ img }` }
                                                    alt={ img }
                                                />

                                                <CardActions>
                                                    <Button fullWidth color="error">
                                                        Eliminar
                                                    </Button>

                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    const product = await dbProducts.getProductBySlug(slug.toString());

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage