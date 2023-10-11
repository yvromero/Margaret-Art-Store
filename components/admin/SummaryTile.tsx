import { FC } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

interface Props {
    title: string | number;
    subtitle: string;
    icon: JSX.Element
}

export const SummaryTile:FC<Props> = ({ title, subtitle, icon }) => {
    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
        <Card sx={{ display: 'flex'}}>
            <CardContent 
                sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                {/* <CreditCardOffOutlined sx={{ fontSize: 30 }}/> */}
                { icon }
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column'}}
            >
                <Typography variant='h3'>{ title }</Typography>
                <Typography variant='h2'>{ subtitle }</Typography>

            </CardContent>
        </Card>
    </Grid>
    )
}
