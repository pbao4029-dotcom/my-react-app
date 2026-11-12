
import {
  Dashboard,
  Inventory,
  Category,
  People,
  MoveToInbox,
  Outbox,
  ReceiptLong,
  Close,
} from '@mui/icons-material';

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';

import { NavLink } from 'react-router-dom';

const drawerWidth = 250;

const menuItems = [
  { text: 'Tổng quan', path: '/', icon: <Dashboard /> },
  { text: 'Sản phẩm', path: '/products', icon: <Inventory /> },
  { text: 'Danh mục', path: '/categories', icon: <Category /> },
  { text: 'Nhà cung cấp', path: '/suppliers', icon: <People /> },
  { text: 'Nhập kho', path: '/stock-in', icon: <MoveToInbox /> },
  { text: 'Xuất kho', path: '/stock-out', icon: <Outbox /> },
  { text: 'Giao dịch', path: '/transactions', icon: <ReceiptLong /> },
];

export default function Sidebar({ mobileOpen = false, onClose }) {
  const sidebarContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: '100%',
        minHeight: '100%',
        bgcolor: '#172554',
        color: '#fff',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Inventory sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold">
            INVENTORY
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: '#fff',
          }}
        >
          <Close />
        </IconButton>
      </Toolbar>

      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          variant="caption"
          sx={{ color: '#94a3b8', px: 1 }}
        >
          QUẢN LÝ KHO HÀNG
        </Typography>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: '#cbd5e1',

                '&.active': {
                  bgcolor: '#2563eb',
                  color: '#fff',
                },

                '&:hover': {
                  bgcolor: '#1e40af',
                  color: '#fff',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Sidebar laptop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#172554',
            color: '#fff',
            border: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Sidebar điện thoại */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          zIndex: 1400,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#172554',
            color: '#fff',
            border: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}
