import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

import { AccountCircleOutlined, AdminPanelSettings, ConfirmationNumberOutlined, LoginOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material";
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';

import { UiContext } from '@/context';



export const SideMenu = () => {


    const router = useRouter();
    const { isMenuOpen, toggleSideMenu} = useContext(UiContext);

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
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value )}
                            onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
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

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItem>


                    <ListItem 
                        button 
                        sx={{ display: 
                        { xs: '', sm: 'none' } }}
                        onClick={ () => navigateTo('/category/paisajes-naturaleza') }
                    >
                        <ListItemIcon>
                            <ColorLensOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Paisajes y Naturaleza'} />
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={ () => navigateTo('/category/retrato-figuras') }
                    >
                        <ListItemIcon>
                            <BrushOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Retrato y Figuras'} />
                    </ListItem>

                    <ListItem 
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={ () => navigateTo('/category/abstracto-contemporaneo') }
                    >
                        <ListItemIcon>
                            <FormatColorFillOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Abstracto y Contemporáneo'} />
                    </ListItem>


                    <ListItem button>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Administrador Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <YardOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}