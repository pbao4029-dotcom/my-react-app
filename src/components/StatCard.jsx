
import {
    Card,
    CardContent,
    Typography,
    Box,
} from '@mui/material';

export default function StatCard({
    title,
    value,
    icon,
    color = '#2563eb',
}) {
    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                borderRadius: 3,
                bgcolor: '#ffffff',
                border: '1px solid #e2e8f0',
                transition: 'all 0.25s ease',
                overflow: 'hidden',

                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                    borderColor: `${color}60`,
                },
            }}
        >
            <CardContent
                sx={{
                    p: 2.5,
                    '&:last-child': {
                        pb: 2.5,
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    {/* Thông tin thống kê */}
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#64748b',
                                fontWeight: 600,
                                fontSize: 13,
                                mb: 1,
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                color: '#172554',
                                fontWeight: 800,
                                fontSize: {
                                    xs: 24,
                                    sm: 27,
                                    md: 30,
                                },
                                lineHeight: 1.2,
                                overflowWrap: 'anywhere',
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>

                    {/* Icon thống kê */}
                    <Box
                        sx={{
                            width: 54,
                            height: 54,
                            minWidth: 54,
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: color,
                            bgcolor: `${color}18`,
                            border: `1px solid ${color}25`,

                            '& svg': {
                                fontSize: 29,
                            },
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                {/* Đường nhấn màu */}
                <Box
                    sx={{
                        mt: 2.5,
                        width: 42,
                        height: 4,
                        borderRadius: 5,
                        bgcolor: color,
                    }}
                />
            </CardContent>
        </Card>
    );
}
