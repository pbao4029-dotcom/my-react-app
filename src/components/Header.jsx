
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
            elevation={0}
            sx={{
                width: {
                    xs: '100%',
                    md: 'calc(100% - 250px)',
                },

                ml: {
                    xs: 0,
                    md: '250px',
                },

                background: 'linear-gradient(135deg, #172554 0%, #1e40af 100%)',
                color: '#ffffff',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 3px 15px rgba(15, 23, 42, 0.18)',
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

                        letterSpacing: '0.3px',
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
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: '0.2s',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.15)',
                            },
                        }}
                    >
                        <NotificationsNoneIcon
                            sx={{
                                fontSize: {
                                    xs: 21,
                                    md: 25,
                                },
                                color: '#bfdbfe',
                            }}
                        />
                    </Box>

                    <Avatar
                        sx={{
                            bgcolor: '#60a5fa',
                            color: '#172554',
                            width: {
                                xs: 30,
                                md: 38,
                            },
                            height: {
                                xs: 30,
                                md: 38,
                            },
                            fontSize: 15,
                            fontWeight: 'bold',
                            border: '2px solid rgba(255,255,255,0.65)',
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
                            color: '#ffffff',
                        }}
                    >
                        Admin
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
