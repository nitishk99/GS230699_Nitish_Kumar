import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Toolbar, Box } from '@mui/material';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';

const drawerWidth = 140;

const LeftMenu = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <Toolbar />
        <List>
          <ListItem  component={Link} to="/store">
          <ListItemIcon sx={{ minWidth: '35px' }}>
             <StoreOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Store" />
          </ListItem>
          <ListItem  component={Link} to="/test">
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <PollOutlinedIcon />  
            </ListItemIcon>
            <ListItemText primary="SKU" />
          </ListItem>
          <ListItem  component={Link} to="/test">
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <PollOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Planning" />
          </ListItem>
          <ListItem  component={Link} to="/test">
          <ListItemIcon sx={{ minWidth: '35px' }}>
          <PollOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Charts" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;