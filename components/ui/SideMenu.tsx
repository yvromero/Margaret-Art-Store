import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

import { AccountCircleOutlined, ConfirmationNumberOutlined, DashboardOutlined, LoginOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { AuthContext, UiContext } from '@/context';



export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { user, isLoggedIn, logoutUser } = useContext( AuthContext );

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;

        navigateTo(`/search/${ searchTerm }`);
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url)
    }

    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={ toggleSideMenu }
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value )}
                            onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar cuadros..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ onSearchTerm }
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItem button onClick={() => navigateTo('/about')}>
                        <ListItemIcon>
                        <PeopleOutlineOutlinedIcon  />
                        </ListItemIcon>
                        <ListItemText primary={'Sobre nosotros'} />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItem button
                                    onClick={() => navigateTo('/checkout/address') }
                                >
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem 
                                    button 
                                    onClick={() => navigateTo('/orders/history') }
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }

                    <ListItem 
                        button 
                        sx={{ display: 
                            { xs: '', sm: '', md:'none' } }}
                        onClick={ () => navigateTo('/category/paisajes-naturaleza') }
                    >
                        <ListItemIcon>
                            <ColorLensOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Paisajes y Naturaleza'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: 
                            { xs: '', sm: '', md:'none' } }}
                        onClick={ () => navigateTo('/category/retrato-figuras') }
                    >
                        <ListItemIcon>
                            <BrushOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Retrato y Figuras'} />
                    </ListItem>

                    <ListItem 
                        button
                        sx={{ display: 
                            { xs: '', sm: '', md:'none' } }}
                        onClick={ () => navigateTo('/category/abstracto-contemporaneo') }
                    >
                        <ListItemIcon>
                            <FormatColorFillOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Abstracto y Contemporáneo'} />
                    </ListItem>


                    {
                        
                        isLoggedIn
                        ? (
                            <ListItem button onClick={ logoutUser }>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                    <ListItemText primary={'Salir'} />
                            </ListItem>
                        )
                        : (
                            <ListItem 
                                button
                                onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                    <ListItemText primary={'Ingresar'} />
                            </ListItem>
                            
                        )
                    }


                    {/* Admin */}
                    {
                        user?.role === 'admin' && (
                            <>
                                <Divider />
                                    <ListSubheader>Panel de Administrador</ListSubheader>

                                    <ListItem 
                                        button
                                        onClick={ () => navigateTo('/admin/products') }
                                    >
                                        <ListItemIcon>
                                            <YardOutlinedIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Productos'} />
                                    </ListItem>

                                    <ListItem 
                                        button
                                        onClick={ () => navigateTo('/admin/orders') }
                                    >
                                        <ListItemIcon>
                                            <ConfirmationNumberOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Ordenes'} />
                                    </ListItem>

                                    <ListItem
                                        button
                                        onClick={ () => navigateTo('/admin/users') }
                                    >
                                        <ListItemIcon>
                                            <AdminPanelSettingsOutlinedIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Usuarios'} />
                                    </ListItem>

                                    <Divider />
                                    <ListSubheader>Datos estadísticos</ListSubheader>

                                    <ListItem 
                                        button
                                        onClick={ () => navigateTo('/admin/') }
                                    >
                                        <ListItemIcon>
                                            <DashboardOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Métricas principales'} />
                                    </ListItem>
                                    
                                    <ListItem 
                                        button
                                        onClick={ () => window.open('https://app.powerbi.com/view?r=eyJrIjoiZTNiMTdiODMtNzUxOC00YTc4LTlkNGEtM2ViOWIzMGFjYTM4IiwidCI6ImI1MjJhNWI5LTViZjMtNDVhMi1hZTgzLTJkZjI2YmRkYWU0ZSJ9', '_blank') }
                                    >
                                        
                                        <ListItemIcon>
                                            <InsertChartOutlinedOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Panel e Informes en Power BI'} />
                                    </ListItem>

                                    
                                    
                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}