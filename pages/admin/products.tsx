import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import useSWR from 'swr';
import { AdminLayout } from "@/components/layouts";
import { IProduct } from "@/interfaces";



const columns: GridColDef[] = [
    { field: 'img', headerName: 'Imagen' },
    { field: 'title', headerName: 'Titulo', width: 250 },
    { field: 'category', headerName: 'Categoria',  width: 250},
    { field: 'theme', headerName: 'Tema', width: 150},
    { field: 'price', headerName: 'Precio', width: 150 },
    { field: 'dimensions', headerName: 'Medidas', width: 150 },
    { field: 'weight', headerName: 'Peso', width: 150 },
    { field: 'inStock', headerName: 'Inventario', width: 150 },
    { field: 'materials', headerName: 'Materiales', width: 150 },
    { field: 'framed', headerName: 'Encuadrado' },
]

const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if ( !data && !error ) return (<></>);

    const rows = data!.map( product  => ({

        id          : product._id,
        img         : product.images[0],
        title       : product.title,
        category    : product.category,
        theme       : product.theme,
        price       : product.price,
        dimensions  : product.dimensions,
        weight      : product.weight,
        inStock     : product.inStock,
        materials   : product.materials,
        framed      : product.framed,

    }))


    return (

        <AdminLayout
            title={`Productos (${ data?.length })`}
            subTitle={'Mantenimiento de Productos'}
            icon={ <YardOutlinedIcon/> }
        >

            <Grid container sx={{ mt: 3}} className='fadeIn'>
                    <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                        <DataGrid 
                            rows={ rows }
                            columns={ columns }
                            // pageSize = {10}
                            // rowsPerPageOptions={[10]}
                                getRowSpacing={(params) => ({
                                    top: params.isFirstVisible ? 0 : 5,
                                    bottom: params.isLastVisible ? 0 : 5,
                                })}
                                    sx={{
                                    '& .MuiDataGrid-row': {
                                        bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
                                        },
                                    }}
                        />
                    </Grid>
                </Grid>
        </AdminLayout>
    )
}

export default ProductsPage