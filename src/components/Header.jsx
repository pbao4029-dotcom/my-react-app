
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        ml: '250px',
        width: 'calc(100% - 250px)',
        backgroundColor: '#fff',
        color: '#1e293b',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold">
          Hệ thống quản lý kho hàng
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NotificationsNoneIcon />

          <Avatar sx={{ bgcolor: '#2563eb' }}>
            A
          </Avatar>

          <Typography fontWeight="medium">
            Admin
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
