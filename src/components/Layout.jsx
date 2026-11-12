
import { useState } from 'react';

import {
  Box,
  Toolbar,
  IconButton,
  Drawer,
  useMediaQuery,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const isMobile = useMediaQuery('(max-width:768px)');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#f1f5f9',
        overflowX: 'hidden',
      }}
    >
      {/* Sidebar trên Laptop */}
      {!isMobile && <Sidebar />}

      {/* Sidebar trên điện thoại */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Khu vực chính */}
      <Box
        sx={{
          flexGrow: 1,
          width: 0,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                position: 'fixed',
                top: 10,
                left: 10,
                zIndex: 1300,
                bgcolor: 'white',
                boxShadow: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ width: '100%', minWidth: 0 }}>
            <Header />
          </Box>
        </Box>

        {/* Nội dung */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            width: '100%',
            p: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
            overflowX: 'auto',
          }}
        >
          <Toolbar />

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
