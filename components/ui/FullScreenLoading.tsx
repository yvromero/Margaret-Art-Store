import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading = () => {
    return (
        <Box 
        display='flex'
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
        >
            <Typography sx={{ mb: 2 }} variant='h1' fontWeight={ 100 } fontSize={ 20 }>
                Cargando...
            </Typography>
            <CircularProgress thickness={ 2 }/>
        </Box>
    )
}