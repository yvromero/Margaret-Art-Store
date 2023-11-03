
import { AdminLayout } from '@/components/layouts';
import useSWR from 'swr';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, GroupTwoTone, TrendingUp } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '@/components/admin';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import { DashboardSummaryResponse } from '@/interfaces';
import { useEffect, useState } from 'react';


const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    })

    const [refreshIn, setRefreshIn ] = useState( 30 );

    useEffect(() => {
        const interval = setInterval(()=>{
            console.log('Tic');
            setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
        }, 1000 );
    
        return () => clearInterval(interval)
    }, [])
    

    if ( !error && !data ) {
        return <></>
    }

    if ( error ) {
        console.log(error);
        return <Typography>Tuvimos unos inconvenientes, intenta nuevamente</Typography>
    }

    const {
        numberOfOrders,  
        paidOrders,       
        pendingOrders,       
        numberOfClients,     
        numberOfProducts,   
        productsZero,      
        productsByCatNature, 
        productsByCatFigure, 
        productsByCatAbstract,
    } = data!;
    
    return (
    <AdminLayout
        title='Dashboard'
        subTitle='Monitoreo de datos'
        icon={ <DashboardOutlined/>}
    >
        <Grid container spacing={5}>

            
            <SummaryTile 
                title={ numberOfOrders } 
                subtitle={'Ordenes Totales'} 
                icon={ <CreditCardOutlined sx={{ fontSize: 40 }}/>}
            />

            <SummaryTile 
                title={ paidOrders } 
                subtitle={'Ordenes Pagadas'} 
                icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }}/>}
            />

            <SummaryTile 
                title={ pendingOrders } 
                subtitle={'Ordenes pendientes'} 
                icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }}/>}
            />

            <SummaryTile 
                title={ numberOfClients } 
                subtitle={'Clientes'} 
                icon={<GroupTwoTone sx={{ fontSize: 40 }}/>}
            />

            <SummaryTile 
                title={ numberOfProducts } 
                subtitle={'Cuadros'} 
                icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }}/>}
            />

            <SummaryTile 
                title={ productsZero } 
                subtitle={'Cuadros no disponibles'} 
                icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }}/>}
            />
        
            <SummaryTile 
                title={ productsByCatNature } 
                subtitle={'Categoría: Paisajes y Naturaleza'} 
                icon={<ColorLensOutlinedIcon sx={{ fontSize: 40 }}/>}
            />
            
            <SummaryTile 
                title={ productsByCatFigure } 
                subtitle={'Categoría: Retrato y Figuras'}
                icon={<BrushOutlinedIcon sx={{ fontSize: 40 }}/>}
            />

            <SummaryTile 
                title={ productsByCatAbstract } 
                subtitle={'Categoría: Abstracto y Contemporáneo'} 
                icon={<FormatColorFillOutlinedIcon sx={{ fontSize: 40 }}/>}
            />


            <SummaryTile 
                title={ refreshIn } 
                subtitle={'Actualización en: '} 
                icon={<AccessTimeOutlined color="warning" sx={{ fontSize: 40 }}/>}
            />

        </Grid>
    </AdminLayout>

    )
}

export default DashboardPage