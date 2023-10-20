import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import useSWR from 'swr';
import { AdminLayout } from "@/components/layouts";
import { IOrder, IUser } from "@/interfaces";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 300 },
    { field: 'nroProducts', headerName: 'Nro. Productos', align: 'center', width: 150 },
    { field: 'total', headerName: 'Monto total', width: 200 },

    {
        field: 'isPaid',
        headerName: 'Estado',
            description: 'Estado de la orden generada',
            width: 250,
            renderCell: ({row}: GridRenderCellParams) => {
                return (
                    row.isPaid
                        ? <Chip color="success" label="Pagado" variant='outlined'/>
                        : <Chip color="error" label="Pendiente de pago" variant='outlined'/>
                )
            }
    },
    {
        field: 'check',
        headerName: 'Orden de Compra',
            description: 'Verificar detalle de la orden',
            width: 250,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <a href={`/admin/orders/${ row.id }` } target="_blank"  rel="noreferrer">
                        Ver orden
                    </a>
                )
            },
    },

    { field: 'name', headerName: 'Nombre completo', width: 250 },
    { field: 'email', headerName: 'Correo electrónico', width: 250 },
    { field: 'createdAt', headerName: 'Creada', width: 250 },
    { field: 'updatedAt', headerName: 'Actualizada', width: 250 },
]

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if ( !data && !error ) return (<></>);

    const rows = data!.map( order  => ({
        id         : order._id,
        nroProducts: order.numberOfItems,
        total      : order.total,
        isPaid     : order.isPaid,
        name       : (order.user as IUser).name,
        email      : (order.user as IUser).email,
        createdAt  : order.createdAt,
        updatedAt  : order.updatedAt,

    }))


    return (

        <AdminLayout
            title={'Ordenes'}
            subTitle={'Seguimiento de órdenes'}
            icon={ <ConfirmationNumberOutlined/> }
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

export default OrdersPage