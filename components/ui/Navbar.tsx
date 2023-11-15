import { useContext, useState } from 'react';
import { CartContext, UiContext } from '../../context';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Input, Link, Toolbar, Typography, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Navbar = () => {

    const { asPath, push }   = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const { numberOfItems }  = useContext( CartContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, SetIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`)
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink legacyBehavior href='/' passHref>
                <Link display='flex' alignItems='center'>
                <Typography variant='h6' style={{ color: 'white' }}>Margaret Art |</Typography>
                <Typography sx={{ ml: 0.5, color: 'white' }}>Shop</Typography>
                </Link>
            </NextLink>

        <Box flex={ 2 }/>
            <Box sx={{ display: isSearchVisible ? 'none' : {xs: 'none', sm: 'none', md: 'block'} }}
                className="fadeIn"
            >
                <NextLink legacyBehavior href='/category/paisajes-naturaleza'>
                        <Link>
                            <Button color={ asPath === '/category/paisajes-naturaleza' ? 'secondary': 'info'}>
                            <Typography sx={{ ml: 0.5 }}variant="button">
                            Paisajes y Naturaleza 
                            </Typography>
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink legacyBehavior href='/category/retrato-figuras'>
                        <Link>
                            <Button color={ asPath === '/category/retrato-figuras' ? 'secondary': 'info'}>
                                <Typography variant="button">
                                    Retrato y Figuras
                                </Typography>
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink legacyBehavior href='/category/abstracto-contemporaneo'>
                        <Link>
                            <Button color={ asPath === '/category/abstracto-contemporaneo' ? 'secondary': 'info'}>
                            <Typography variant="button">
                            Abstracto y Contemporáneo
                            </Typography>
                            </Button>
                        </Link>
                    </NextLink>
            </Box>

        <Box flex={ 2 }/>

        {/* Pantallas grandes */}
        {/* Crear condicion para mostrar u ocultar la caja de busqueda */}
        
        {
            isSearchVisible
            ?
            (
                <Input
                    sx={{ color: 'white', display: {xs: 'none', sm: 'flex'} }}
                    className='fadeIn'
                    autoFocus
                    value={ searchTerm }
                    onChange={ (e) => setSearchTerm( e.target.value )}
                    onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                    type='text'
                    placeholder="Buscar cuadros..."
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            onClick={ () => SetIsSearchVisible(false) }
                        >
                        <ClearOutlined/>
                        </IconButton>
                        </InputAdornment>
                    }
                />
            )
            :
            (
            <IconButton 
                onClick={ () => SetIsSearchVisible(true) }
                className='fadeIn'
                sx={{ display: { xs: 'none', sm: 'flex', color: 'white'} }}
            >
                <SearchOutlined/>
            </IconButton>

            )
        }
        


        {/* Pantallas pequenhas */}
        <IconButton
            sx={{ display: { xs: 'flex', sm: 'none'} }}
            onClick={ toggleSideMenu }
        >
            <SearchOutlined/>
        </IconButton>


        <NextLink legacyBehavior href="/cart" passHref>
            <Link>
                <IconButton>
                <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                    <ShoppingCartOutlinedIcon />
                </Badge>
                </IconButton>
            </Link>
         </NextLink>


        <IconButton 
        onClick={ toggleSideMenu }
        sx={{ ml: 0.5 }}>
            <MenuIcon />
        </IconButton>


        </Toolbar>
    </AppBar>
)
}
