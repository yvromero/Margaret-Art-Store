import { Drawer, Box, Input, List, ListItem } from '@mui/material';

export const SideMenu = () => {
  return (
    <Drawer
        open={ true }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition:'all 0.5 s ease-out'}}
    >
    <Box>
        <List>
            <ListItem>
                <Input/>
            </ListItem>
        </List>
    </Box>
    </Drawer>
  )
}
