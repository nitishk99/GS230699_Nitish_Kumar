import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Toolbar, Box } from '@mui/material';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { LeftMenuStyles } from './LeftMenuStyles';

const LeftMenu = () => {
  return (
    <Drawer
      sx={LeftMenuStyles.drawer}
      variant="permanent"
    >
      <Box >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/store">
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <StoreOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Store" />
          </ListItem>
          <ListItem component={Link} to="/test">
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <PollOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="SKU" />
          </ListItem>
          <ListItem component={Link} to="/test">
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <PollOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Planning" />
          </ListItem>
          <ListItem component={Link} to="/test">
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
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