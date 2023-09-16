
import { Divider, Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
    <Grid container>
        
            
        <Grid item xs={6}>
            <Typography>Cantidad</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3 items</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography> {`$${ 1200 }`} </Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos (10%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography> {`$${ 120 }`} </Typography>
        </Grid>

        <Grid item xs={12}>
        <Divider sx={{ my: 1 }} />
      </Grid>

        <Grid item xs={6} sx={{ mt:1 }}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:1 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1"> {`$${ 1320 }`} </Typography>
        </Grid>


    </Grid>
  )
}
