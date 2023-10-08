import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, Box, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UiContext } from '../../context';


export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );


    return (
        <AppBar>
            <Toolbar>
                <NextLink legacyBehavior href='/' passHref>
                    <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Margaret Art |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>


            <Box flex={ 2 }/>

            <IconButton 
            onClick={ toggleSideMenu }
            sx={{ ml: 0.5 }}>
                <MenuIcon />
            </IconButton>


            </Toolbar>
        </AppBar>
    )
}
