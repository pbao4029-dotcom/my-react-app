
import { useState } from 'react';

import {
  Box,
  Toolbar,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md')
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
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
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
      />

      {/* Khu vực chính */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Nút mở menu trên điện thoại */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: 10,
              left: 10,
              zIndex: 1200,
              bgcolor: '#fff',
              boxShadow: 2,
              '&:hover': {
                bgcolor: '#e2e8f0',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Header */}
        <Header />

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
