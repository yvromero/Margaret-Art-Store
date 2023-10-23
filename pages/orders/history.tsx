import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { grey } from '@mui/material/colors';

import { ShopLayout } from "@/components/layouts";
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import moment from 'moment';
import { useState } from 'react';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullname', headerName: 'Nombre Completo', width: 220},

    {
        field: 'paid',
        headerName: 'Estado',
        description: 'Estado de la orden generada',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagado" variant='outlined'/>
                    : <Chip color="error" label="Pendiente de pago" variant='outlined'/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Orden de Compra',
        sortable: false,
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink legacyBehavior href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'createdAt', headerName: 'Creada', width: 220,
        renderCell: (params) =>
            moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
},
    { field: 'updatedAt', headerName: 'Actualizada', width: 220,
        renderCell: (params) =>
            moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
},
];

interface Props {
    orders: IOrder[],

}

const HistoryOrderPage: NextPage<Props> = ({ orders }) => {

    const [pageSize, setPageSize] = useState(5)

    const rows = orders.map(( order, indice ) => ({
        id: indice + 1,
        paid: order.isPaid,
        fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        orderId: order._id,
        createdAt  : order.createdAt,
        updatedAt  : order.updatedAt,
        
    }));

    return (

    <ShopLayout title={'Historial de órdenes'} pageDescription="Historial de órdenes del cliente">

        <Typography
            variant="h1"
            component="h1"
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
            Historial de órdenes
        </Typography>

        <Grid container sx={{ mt: 3}} className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pagination={true}
                    // @ts-ignore
                    pageSize = {pageSize}
                    rowsPerPageOptions={[10,15,20]}
                    onPageSizeChange={(newPageSize:number) => setPageSize(newPageSize)}
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
    </ShopLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }

    }

    const orders = await dbOrders.getOrderByUser( session.user._id );
    return {
        props: {
            orders
        }
    }
}

export default HistoryOrderPage;