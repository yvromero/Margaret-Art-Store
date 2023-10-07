import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, gridClasses } from "@mui/x-data-grid";
import { grey } from '@mui/material/colors';
import { ShopLayout } from "@/components/layouts";



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullname', headerName: 'Nombre Completo', width: 300},

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Estado de la orden generada',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Orden pagada" variant='outlined'/>
                    : <Chip color="error" label="Orden no pagada" variant='outlined'/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        sortable: false,
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink legacyBehavior href={`/orders/${ params.row.id }`} passHref>
                    <Link underline='always'>
                        Ver pedido
                    </Link>
                </NextLink>
            )
        }
    }

];

const rows = [
    {id: 1, paid: true, fullname: 'Frank Romero'},
    {id: 2, paid: false, fullname: 'Frank Romero'},
    {id: 3, paid: true, fullname: 'Frank Romero'},
    {id: 4, paid: true, fullname: 'Frank Romero'},
    {id: 5, paid: false, fullname: 'Frank Romero'},
    {id: 6, paid: true, fullname: 'Frank Romero'},
    {id: 7, paid: false, fullname: 'Frank Romero'},
    {id: 8, paid: false, fullname: 'Frank Romero'},
    {id: 9, paid: true, fullname: 'Frank Romero'},
    {id: 10, paid: false, fullname: 'Frank Romero'},
    {id: 11, paid: false, fullname: 'Frank Romero'}
]



const HistoryOrderPage = () => {


    return (

    <ShopLayout title={'Historial de pedidos'} pageDescription="Historial de pedidos del cliente">
        <Typography
            variant="h1"
            component="h1"
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
            Historial de ordenes
        </Typography>

        <Grid container sx={{ mt: 3}}>
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    // pageSize={10}
                    // rowsPerPageOptions={[10]}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    sx={{
                      [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                          theme.palette.mode === 'light' ? grey[200] : grey[900],
                      },
                    }}
                  />
                
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryOrderPage;