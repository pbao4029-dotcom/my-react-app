
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
        width: {
          xs: '100%',
          md: 'calc(100% - 250px)',
        },

        ml: {
          xs: 0,
          md: '250px',
        },

        backgroundColor: '#fff',
        color: '#1e293b',
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: '64px',
            md: '64px',
          },

          justifyContent: 'space-between',

          pl: {
            xs: '60px',
            md: 3,
          },

          pr: {
            xs: 1.5,
            md: 3,
          },

          gap: 1,
        }}
      >
        {/* Tiêu đề */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: '14px',
              sm: '17px',
              md: '20px',
            },

            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
            flex: 1,
          }}
        >
          Hệ thống quản lý kho hàng
        </Typography>

        {/* Thông tin Admin */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: {
              xs: 0.8,
              md: 2,
            },

            flexShrink: 0,
          }}
        >
          <NotificationsNoneIcon
            sx={{
              fontSize: {
                xs: 21,
                md: 25,
              },
            }}
          />

          <Avatar
            sx={{
              bgcolor: '#2563eb',
              width: {
                xs: 30,
                md: 38,
              },
              height: {
                xs: 30,
                md: 38,
              },
              fontSize: 15,
            }}
          >
            A
          </Avatar>

          <Typography
            fontWeight="medium"
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              fontSize: 14,
            }}
          >
            Admin
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
