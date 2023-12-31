import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { margaretApi } from '../../../fetching';
import { Product } from '../../../models';
import { toast } from 'sonner';


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

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newTagValue, setNewTagValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);



    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    useEffect(() => {
        const subscription = watch(( value, { name, type }) => {

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
    

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');

        if ( currentTags.includes(newTag) ) {
            return; 
        }
        currentTags.push(newTag);

    }

    const onDeleteTag = ( tag: string ) => {
        const updateTags = getValues('tags').filter( t => t !== tag );
        setValue('tags', updateTags, { shouldValidate: true })
    }


    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement> ) => {
        if ( !target.files || target.files.length === 0 ) {
            return;
        }
        try {
            
            for ( const file of target.files ){
                
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await margaretApi.post<{ message: string }>('/admin/upload', formData);
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
            }
        } catch (error) {
            console.log({error});
            
        }
    }

    const onDeleteImage = ( image: string ) => {
        setValue(
            'images', 
            getValues('images').filter( img => img !== image ),
        { shouldValidate: true }
        );
    }

        const onSubmit = async (form: FormData) => {
            
            setIsSaving(true);

            if (form.images.length < 1) {
                // Mostrar alerta de advertencia si no hay imágenes
                toast.warning('Mínimo 1 imagen', { position: 'top-center' });
                // No bloquear el botón si hay un warning
                setIsSaving(false); 
                return;
            }
            
        
            try {
            const { data } = await margaretApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: form,
            });
        
            // console.log({ data });
    
                if (!form._id) {
                    toast.success('Producto guardado exitosamente', { position: 'top-center' });
                    router.replace(`/admin/products/${form.slug}`);
                } else {
                    toast.success('Producto actualizado', { position: 'top-center' });
                    router.replace(`/admin/products/${form.slug}`);
                }
                } catch (error) {
                    console.error(error);
                    // Mostrar alerta de error si hay un problema al guardar
                    toast.error('Error al guardar el producto', { position: 'top-center' });
                    // Botón desbloqueado cuando hay error
                    setIsSaving(false);
                }  finally {
                    // Botón desbloqueado cuando se realiza una modificación 
                    if (form._id) {
                        setIsSaving(false);
                    }
                }
            };


    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editar: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
        <Box display='flex' justifyContent='left' sx={{ mb: 3 }}>
        <Button 
            variant='contained' 
            color='secondary' 
            startIcon={ <ArrowBackOutlinedIcon  /> }
            href='/admin/products'>
                Ir a listado de productos
        </Button>
        </Box>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 3 }}>
                    <Button 
                        variant='contained'
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '200px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar producto
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
                            })}
                            error={ !!errors.materials }
                            helperText={ errors.materials?.message }
                        />

                        <TextField
                            label="Enmarcado"
                            type='string'
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
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue(target.value) }
                            onKeyUp={({ code })=> code === 'Space' ? onNewTag() : undefined }
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
                                getValues('tags').map((tag) => {

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
                                variant='contained'
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>

                            <Typography variant="body2" sx={{ mb: 2 }}>
                            Nota: Asegúrese de que las imágenes no superen el tamaño máximo de 5 MB y sean en formato JPG, PNG, GIF, JPEG o WEBP.
                            </Typography>

                            <input
                                ref={ fileInputRef}
                                type="file"
                                multiple
                                accept="image/jpg, image/png, image/gif, image/jpeg"
                                style={{ display: 'none'}}
                                onChange={ onFilesSelected }
                            />

                            <Chip 
                                label="Se requiere la carga de una imagen"
                                color='error'
                                variant='outlined'
                                icon={ <InsertPhotoIcon/> }
                                sx={{ display: getValues('images').length < 1 ? 'flex': 'none'}}
                            />

                            <Grid 
                                container 
                                spacing={1}
                            >
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={12} key={img}
                                        >
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />

                                                <CardActions>
                                                    <Button
                                                        startIcon={ <DeleteForeverOutlinedIcon /> }
                                                        variant='contained'
                                                        fullWidth 
                                                        color="error"
                                                        onClick={()=> onDeleteImage(img)}
                                                        
                                                    >
                                                        Eliminar imagen
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

    let product: IProduct | null;

    if ( slug === 'new' ) {
        // Crear un producto

        const tempProduct = JSON.parse( JSON.stringify( new Product() ) )
        delete tempProduct._id;
        tempProduct.images = ['example.jpg'];
        product = tempProduct;

    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }
    

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