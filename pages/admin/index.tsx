import React from 'react';
import { AdminLayout } from '@/components/layouts';
import { DashboardOutlined } from '@mui/icons-material';

const DashboardPage = () => {
    return (
    <AdminLayout
        title='Dashboard'
        subTitle='Monitoreo de datos'
        icon={ <DashboardOutlined/>}
    >

    </AdminLayout>

    )
}

export default DashboardPage
