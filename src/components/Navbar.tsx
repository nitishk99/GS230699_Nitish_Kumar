import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/images/logo.svg';

const NavBar = () => {
  const [anchorE, setAnchorE] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Company Logo" style={{ height: '50px' }} />
        </Box>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorE}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorE)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Sign In</MenuItem>
          <MenuItem onClick={handleClose}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;