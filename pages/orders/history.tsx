import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { ShopLayout } from "@/components/layouts"
import { truncate } from 'fs';

const columns: GridColDef[] = [
    { field: 'id', headName: 'ID', width: 100},
    { field: 'fullname', headName: 'Nombre Completo', width: 300},

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Estado de la orden generada',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined'/>
                    : <Chip color="error" label="No Pagada" variant='outlined'/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Orden',
        sortable: false,
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
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
    {id: 7, paid: false, fullname: 'Frank Romero'}
]

const HistoryOrderPage = () => {
  return (
    <ShopLayout title={'Historial de pedidos'} pageDescription="Historial de pedidos del cliente">
        <Typography variant='subtitle1' component='h1'>
            Historial de pedidos
        </Typography>
        <Grid container sx={{ mt: 3}}>
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [5] }
                    disableClickEventBubbling={true}
                    onCellClick={(params, event) => {
                        event.stopPropagation(); // Evita que se propague el evento de clic
                    }}
                    
                
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryOrderPage;