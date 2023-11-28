import * as React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Link, Grid, Typography,Container} from "@mui/material";
import NextLink from 'next/link';


export default function Footer() {
    return (
        <Box
        component="footer"
        sx={{
        backgroundColor: (theme) =>
            theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        }}

    >

        <Container 
        maxWidth="lg"
        sx={{
            minHeight: '65.5vh',
            padding: '5em',
            marginBottom: '1em'
        }}>
            <Grid container spacing={5}
            >
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Margarita <span style={{ color: 'rgb(255, 95, 162)', fontWeight: 'bold' }}>Ruiz</span>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                Llevando arte en cada rincón del mundo
                </Typography>
                <Grid item xs={12} sm={7}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                </Typography>
                <Link href="https://www.facebook.com/" color="inherit">
                <Facebook />
                </Link>
                <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
                >
                <Instagram />
                </Link>
                <Link href="https://www.twitter.com/" color="inherit">
                <Twitter />
                </Link>
            </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Contáctenos
                </Typography>
                <Typography variant="body1">
                Primer Presidente, Asunción, Paraguay
                </Typography>
                <Typography variant="body1">
                Email: info@margaret-art.com
                </Typography>
                <Typography variant="body1">
                Phone: +595 991 262626
                </Typography>
                
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Servicio al cliente
                </Typography>

                <Typography variant="body1" color="text.secondary">
                <NextLink 
                    legacyBehavior 
                    href="/customers/shipping-policies" passHref>
                    <Link 
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                    Envíos
                    </Link>
                </NextLink>
                </Typography>

                <Typography variant="body1" color="text.secondary">
                <NextLink 
                    legacyBehavior 
                    href="/customers/return-policy" passHref>
                    <Link 
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        Devoluciones
                    </Link>
                </NextLink>
                </Typography>

                <Typography variant="body1" color="text.secondary">
                <NextLink 
                    legacyBehavior 
                    href="/customers/cookies-policies" passHref>
                    <Link 
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        Política de cookies
                    </Link>
                </NextLink>
                </Typography>

                <Typography variant="body1" color="text.secondary">
                <NextLink 
                    legacyBehavior 
                    href="/customers/terms-conditions" passHref>
                    <Link 
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        Términos y condiciones
                    </Link>
                </NextLink>
                </Typography>
            </Grid>
            </Grid>
            <Box mt={5} >
            <Typography 
                variant="body1" 
                color="text.secondary" 
                align="center"
                sx={{
                    marginBottom: 0,
                }}
            >    
            ©  {new Date().getFullYear()} All rights reserved | Build with <span style={{ color: 'rgb(255, 95, 162)' }}>❤</span> by{' '} <span style={{ color: 'rgb(0, 0, 0)', fontWeight: 'bold' }}>The Romers</span>
            </Typography>
            </Box>
        </Container>
        </Box>
        
    );
    }