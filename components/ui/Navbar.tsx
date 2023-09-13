import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { SearchOutlined, ShoppingCart  } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';


export const Navbar = () => {
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
            <Box sx={{ display: {xs: 'none', sm: 'none', md: 'block'} }}>
                <NextLink legacyBehavior href='/category/paisajes-naturaleza'>
                        <Link>
                            <Button>
                            Paisajes y Naturaleza 
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink legacyBehavior href='/category/retrato-figuras'>
                        <Link>
                            <Button>
                            Retrato y Figuras 
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink legacyBehavior href='/category/abstracto-contemporaneo'>
                        <Link>
                            <Button>
                            Abstracto y Contemporáneo 
                            </Button>
                        </Link>
                    </NextLink>
            </Box>

        <Box flex={ 2 }/>

        <IconButton>
            <SearchOutlined/>
        </IconButton>

        <NextLink legacyBehavior href="/cart" passHref>
            <Link>
                <Badge badgeContent={ 2 } color="secondary">
                    <ShoppingCart/>
                </Badge>
            </Link>
        </NextLink>

        <IconButton>
            <MenuIcon />
        </IconButton>

        {/* <Button>
            Menu
        </Button> */}

        </Toolbar>
    </AppBar>
  )
}