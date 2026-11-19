
import { useState } from 'react';

import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    IconButton,
    Chip,
    Divider,
    InputAdornment,
} from '@mui/material';

import {
    Add,
    Delete,
    Category as CategoryIcon,
    Inventory2Outlined,
} from '@mui/icons-material';

export default function Categories({
    categories = [],
    setCategories,
    products = [],
}) {
    const [open, setOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    // Thêm danh mục
    const handleAdd = () => {
        const name = newCategory.trim();

        if (!name) {
            alert('Vui lòng nhập tên danh mục.');
            return;
        }

        const isDuplicate = categories.some(
            (item) => item.trim().toLowerCase() === name.toLowerCase()
        );

        if (isDuplicate) {
            alert('Danh mục này đã tồn tại.');
            return;
        }

        setCategories((previous) => [...previous, name]);

        setNewCategory('');
        setOpen(false);
    };

    // Xóa danh mục
    const handleDelete = (category) => {
        const used = products.some(
            (product) =>
                String(product.category).trim().toLowerCase() ===
                category.trim().toLowerCase()
        );

        if (used) {
            alert('Không thể xóa danh mục đang có sản phẩm sử dụng.');
            return;
        }

        if (
            window.confirm(
                `Bạn có chắc muốn xóa danh mục "${category}"?`
            )
        ) {
            setCategories((previous) =>
                previous.filter((item) => item !== category)
            );
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Tiêu đề trang */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: {
                        xs: 'flex-start',
                        sm: 'center',
                    },
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#172554',
                            fontWeight: 800,
                            mb: 0.5,
                        }}
                    >
                        Quản lý danh mục
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: '#64748b' }}
                    >
                        Quản lý và phân loại sản phẩm trong kho hàng
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpen(true)}
                    sx={{
                        bgcolor: '#2563eb',
                        borderRadius: 2,
                        px: 2.5,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: '0 4px 10px rgba(37,99,235,0.2)',

                        '&:hover': {
                            bgcolor: '#1d4ed8',
                            boxShadow: '0 6px 14px rgba(37,99,235,0.3)',
                        },
                    }}
                >
                    Thêm danh mục
                </Button>
            </Box>

            {/* Thống kê nhanh */}
            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border: '1px solid #dbeafe',
                    bgcolor: '#eff6ff',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        '&:last-child': { pb: 2 },
                    }}
                >
                    <Box
                        sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2,
                            bgcolor: '#dbeafe',
                            color: '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CategoryIcon sx={{ fontSize: 26 }} />
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: 13,
                                color: '#64748b',
                                fontWeight: 600,
                            }}
                        >
                            Tổng số danh mục
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: '#1e40af',
                                fontWeight: 800,
                            }}
                        >
                            {categories.length}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Danh sách danh mục */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                    },
                    gap: 2,
                }}
            >
                {categories.map((category) => {
                    const count = products.filter(
                        (product) =>
                            String(product.category).trim().toLowerCase() ===
                            category.trim().toLowerCase()
                    ).length;

                    return (
                        <Card
                            key={category}
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                border: '1px solid #e2e8f0',
                                transition: 'all 0.25s ease',

                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: '#93c5fd',
                                    boxShadow:
                                        '0 8px 22px rgba(15,23,42,0.07)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2.5,
                                            bgcolor: '#eff6ff',
                                            color: '#2563eb',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Inventory2Outlined
                                            sx={{ fontSize: 27 }}
                                        />
                                    </Box>

                                    <IconButton
                                        onClick={() =>
                                            handleDelete(category)
                                        }
                                        aria-label={`Xóa ${category}`}
                                        sx={{
                                            color: '#94a3b8',
                                            '&:hover': {
                                                color: '#dc2626',
                                                bgcolor: '#fee2e2',
                                            },
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>

                                <Typography
                                    sx={{
                                        mt: 2,
                                        mb: 1.5,
                                        color: '#172554',
                                        fontSize: 17,
                                        fontWeight: 700,
                                        overflowWrap: 'anywhere',
                                    }}
                                >
                                    {category}
                                </Typography>

                                <Divider sx={{ mb: 1.5 }} />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#64748b' }}
                                    >
                                        Sản phẩm
                                    </Typography>

                                    <Chip
                                        label={`${count} sản phẩm`}
                                        size="small"
                                        sx={{
                                            bgcolor: '#dbeafe',
                                            color: '#1d4ed8',
                                            fontWeight: 700,
                                            borderRadius: 1.5,
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>

            {/* Trạng thái chưa có danh mục */}
            {categories.length === 0 && (
                <Card
                    elevation={0}
                    sx={{
                        mt: 2,
                        py: 6,
                        textAlign: 'center',
                        border: '1px dashed #cbd5e1',
                        borderRadius: 3,
                    }}
                >
                    <CategoryIcon
                        sx={{
                            fontSize: 50,
                            color: '#94a3b8',
                            mb: 1,
                        }}
                    />

                    <Typography
                        sx={{
                            color: '#64748b',
                            fontWeight: 600,
                        }}
                    >
                        Chưa có danh mục nào
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: '#94a3b8', mt: 0.5 }}
                    >
                        Hãy thêm danh mục đầu tiên của bạn.
                    </Typography>
                </Card>
            )}

            {/* Dialog thêm danh mục */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 1,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        color: '#172554',
                        fontWeight: 800,
                        pb: 1,
                    }}
                >
                    Thêm danh mục mới
                </DialogTitle>

                <DialogContent>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#64748b',
                            mb: 2,
                        }}
                    >
                        Nhập tên danh mục bạn muốn thêm vào hệ thống.
                    </Typography>

                    <TextField
                        autoFocus
                        fullWidth
                        label="Tên danh mục"
                        placeholder="Ví dụ: Đồ điện tử"
                        value={newCategory}
                        onChange={(event) =>
                            setNewCategory(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleAdd();
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryIcon
                                        sx={{ color: '#64748b' }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mt: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            setNewCategory('');
                        }}
                        sx={{
                            color: '#64748b',
                            fontWeight: 600,
                            textTransform: 'none',
                        }}
                    >
                        Hủy
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        sx={{
                            bgcolor: '#2563eb',
                            borderRadius: 2,
                            px: 3,
                            fontWeight: 700,
                            textTransform: 'none',

                            '&:hover': {
                                bgcolor: '#1d4ed8',
                            },
                        }}
                    >
                        Thêm danh mục
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
