import NextLink from 'next/link';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

import useSWR from 'swr';
import { AdminLayout } from "@/components/layouts";
import { IProduct } from "@/interfaces";
import { AddOutlined } from '@mui/icons-material';
import { useState } from 'react';




const columns: GridColDef[] = [

    {field: 'id', headerName: 'ID', width: 40},
    
    {  
        field: 'title', 
        headerName: 'Título', 
        width: 250,
        renderCell: ({row}: GridRenderCellParams) => {
            return (
                <NextLink legacyBehavior href={`/admin/products/${ row.slug }`} passHref>
                    <Link underline='always'> 
                        { row.title }
                    </Link>
                </NextLink>
            )
        }
    },
    { 
        field: 'img', 
        headerName: 'Imagen',
        renderCell: ({ row }: GridRenderCellParams ) => {

            return (
                <NextLink legacyBehavior href={`/product/${ row.slug}` } passHref>
                    <Link underline='always'> 
                        <CardMedia
                            component={'img'}
                            alt={ row.title }
                            className= 'fadeIn'
                            image={ row.img }
                        />
                    </Link>
                </NextLink>
            )
        }
    },

    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'inStock', headerName: 'Stock', width: 80 },
    { field: 'category', headerName: 'Categoría',  width: 200},
    { field: 'theme', headerName: 'Tema', width: 100},
    { field: 'dimensions', headerName: 'Medidas', width: 100 },
    { field: 'weight', headerName: 'Peso', width: 100 },
    { field: 'materials', headerName: 'Material', width: 100 },
    { field: 'framed', headerName: 'Encuadrado' },


]

const ProductsPage = () => {

    const [pageSize, setPageSize] = useState(10)

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if ( !data && !error ) return (<></>);

    const rows = data!.map( ( product, indice )  => ({

        id          : indice + 1,
        title       : product.title,
        img         : product.images[0],
        category    : product.category,
        theme       : product.theme,
        price       : product.price,
        dimensions  : product.dimensions,
        weight      : product.weight,
        inStock     : product.inStock,
        materials   : product.materials,
        framed      : product.framed,
        slug        : product.slug,

    }))


    return (

        <AdminLayout
            title={`Cuadros (${ data?.length })`}
            subTitle={'Mantenimiento de Productos'}
            icon={ <YardOutlinedIcon/> }
        >
            <Box display='flex' justifyContent='end' sx={ { mb: 2} }>
                <Button
                    variant='contained'
                    startIcon={ <AddOutlined/> }
                    color='secondary'
                    href="/admin/products/new"
                >
                    Crear producto
                </Button>

            </Box>


            <Grid container sx={{ mt: 3}} className='fadeIn'>
                    <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                        <DataGrid 
                            rows={ rows }
                            columns={ columns }
                            disableSelectionOnClick 
                            pagination={true}
                            pageSize = {pageSize}
                            onPageSizeChange={(newPageSize:number) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[10,50,100]}
                                getRowSpacing={(params) => ({
                                    top: params.isFirstVisible ? 0 : 5,
                                    bottom: params.isLastVisible ? 0 : 5,
                                })}
                                    sx={{
                                    '& .MuiIconButton-root': {
                                        color: 'black', 
                                    },
                                    '& .MuiDataGrid-row': {
                                        bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[300] : grey[900]),
                                        }
                                    }}
                                    
                                    components={{
                                        Toolbar: () => {
                                            return <GridToolbarContainer 
                                                sx={{justifyContent: 'flex-end'}}>
                                                <GridToolbarExport
                                                    csvOptions={{
                                                        fileName: 'Productos Margaret Art',
                                                        utf8WithBom: true,
                                                }}/>
                                            </GridToolbarContainer>
                                        }
                                    }}
                        />
                    </Grid>
                </Grid>
        </AdminLayout>
    )
}

export default ProductsPage