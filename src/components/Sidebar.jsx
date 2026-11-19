
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
    Divider,
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

export default function Sidebar({
    mobileOpen = false,
    onClose,
}) {
    const sidebarContent = (
        <Box
            sx={{
                width: drawerWidth,
                height: '100%',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, #172554 0%, #1e3a8a 100%)',
                color: '#ffffff',
            }}
        >
            {/* Logo */}
            <Toolbar
                sx={{
                    minHeight: '72px !important',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 2.5,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                    }}
                >
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.2)',
                        }}
                    >
                        <Inventory
                            sx={{
                                fontSize: 25,
                                color: '#ffffff',
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: 1,
                                lineHeight: 1.2,
                            }}
                        >
                            INVENTORY
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 10,
                                color: '#bfdbfe',
                                letterSpacing: 1.5,
                            }}
                        >
                            MANAGEMENT SYSTEM
                        </Typography>
                    </Box>
                </Box>

                {/* Nút đóng trên điện thoại */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        color: '#ffffff',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.15)',
                        },
                    }}
                >
                    <Close />
                </IconButton>
            </Toolbar>

            <Divider
                sx={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    mx: 2,
                }}
            />

            {/* Menu */}
            <Box sx={{ px: 2, py: 3, flexGrow: 1 }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: '#93c5fd',
                        px: 1.5,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                    }}
                >
                    QUẢN LÝ KHO HÀNG
                </Typography>

                <List sx={{ mt: 1.5 }}>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            onClick={onClose}
                            end={item.path === '/'}
                            sx={{
                                borderRadius: 2,
                                mb: 0.8,
                                minHeight: 48,
                                px: 2,
                                color: '#cbd5e1',
                                transition: 'all 0.2s ease',

                                '& .MuiListItemIcon-root': {
                                    color: 'inherit',
                                    minWidth: 40,
                                    transition: 'all 0.2s ease',
                                },

                                '& .MuiListItemText-primary': {
                                    fontSize: 14,
                                    fontWeight: 500,
                                },

                                '&.active': {
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    color: '#ffffff',
                                    boxShadow: '0 4px 12px rgba(37,99,235,0.35)',

                                    '& .MuiListItemText-primary': {
                                        fontWeight: 700,
                                    },
                                },

                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.12)',
                                    color: '#ffffff',
                                    transform: 'translateX(3px)',
                                },

                                '&.active:hover': {
                                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                }}
            >
                <Typography
                    sx={{
                        color: '#bfdbfe',
                        fontSize: 11,
                        textAlign: 'center',
                    }}
                >
                    INVENTORY SYSTEM © 2026
                </Typography>
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
                        border: 0,
                        overflowX: 'hidden',
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
                        border: 0,
                        overflowX: 'hidden',
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
}
