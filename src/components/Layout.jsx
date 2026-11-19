
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
                    bgcolor: '#f1f5f9',
                }}
            >
                {/* Nút mở menu trên điện thoại */}
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            position: 'fixed',
                            top: 12,
                            left: 12,
                            zIndex: 1200,
                            width: 38,
                            height: 38,
                            bgcolor: '#ffffff',
                            color: '#1e40af',
                            border: '1px solid #dbeafe',
                            boxShadow: '0 3px 10px rgba(15,23,42,0.12)',
                            transition: 'all 0.2s ease',

                            '&:hover': {
                                bgcolor: '#dbeafe',
                                transform: 'scale(1.05)',
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
                        bgcolor: '#f1f5f9',
                    }}
                >
                    <Toolbar />

                    <Box
                        sx={{
                            width: '100%',
                            minWidth: 0,
                            bgcolor: '#ffffff',
                            borderRadius: {
                                xs: 2,
                                md: 3,
                            },
                            p: {
                                xs: 1.5,
                                sm: 2,
                                md: 3,
                            },
                            boxShadow: '0 2px 12px rgba(15,23,42,0.04)',
                            border: '1px solid #e2e8f0',
                            minHeight: 'calc(100vh - 120px)',
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
