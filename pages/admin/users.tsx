import { useState, useEffect } from 'react';
import { AdminPanelSettings } from "@mui/icons-material";
import useSWR from 'swr';
import moment from 'moment';

import { Grid, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";

import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

import { AdminLayout } from "@/components/layouts";
import { IUser } from "@/interfaces";
import { margaretApi } from "@/fetching";



const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([]);
    const [pageSize, setPageSize] = useState(10)


    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data])
    


    if ( !data && !error ) return (<></>);

    const onRoleUpdated = async (userId: string, newRole: string) => {

        const previousUsers = users.map(user => ({ ...user }));
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role,
        }));

            setUsers(updatedUsers);

        try {

            await margaretApi.put('/admin/users', { userId, role: newRole });

        } catch (error) {
            
            setUsers(previousUsers);
            console.error(error);
            alert('No se pudo actualizar el rol del usuario');

        }
    };



    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo electrónico', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 250 },
        { 
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}: GridRenderCellParams) => {

                return(
                    <Select
                        value={row.role}
                        label='Rol'
                        onChange={e => onRoleUpdated(row.id, e.target.value)}
                        sx={{ width: 300 }}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        },
        { field: 'createdAt', headerName: 'Creada', width: 200,
            renderCell: (params) =>
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
    },
        { field: 'updatedAt', headerName: 'Actualizada', width: 200,
                renderCell: (params) =>
                    moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
    },

    ];

    const rows = users.map( (user) => ({
        id         : user._id,
        email      : user.email,
        name       : user.name,
        role       : user.role,
        createdAt  : user.createdAt,
        updatedAt  : user.updatedAt,

    }))


    return (
        <AdminLayout 
            title={'Usuarios'} 
            subTitle={'Mantenimiento de usuarios'}
            icon={ <AdminPanelSettings/>}
        >
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
                                },
                            }}
                            components={{
                                Toolbar: () => {
                                    return<GridToolbarContainer 
                                        sx={{justifyContent: 'flex-end'}}>
                                        <GridToolbarExport
                                            csvOptions={{
                                                fileName: 'Usuarios Margaret Art',
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

export default UsersPage