
import { useState } from 'react';

import {
    Box,
    Button,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Typography,
    IconButton,
    Stack,
    Divider,
    Paper,
    Chip,
} from '@mui/material';

import {
    MoveToInbox,
    Add,
    Delete,
    Inventory2Outlined,
} from '@mui/icons-material';

export default function StockIn({
    products = [],
    setProducts,
    onAddTransaction,
}) {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [note, setNote] = useState('');
    const [items, setItems] = useState([]);

    const handleAddProduct = () => {
        const product = products.find(
            (p) => String(p.id) === String(productId)
        );

        const amount = Number(quantity);

        if (!product) {
            alert('Vui lòng chọn sản phẩm.');
            return;
        }

        if (!Number.isInteger(amount) || amount <= 0) {
            alert('Số lượng phải là số nguyên lớn hơn 0.');
            return;
        }

        setItems((previous) => {
            const exists = previous.find(
                (item) => String(item.productId) === String(product.id)
            );

            if (exists) {
                return previous.map((item) =>
                    String(item.productId) === String(product.id)
                        ? {
                            ...item,
                            quantity: Number(item.quantity) + amount,
                        }
                        : item
                );
            }

            return [
                ...previous,
                {
                    productId: product.id,
                    productName: product.title,
                    quantity: amount,
                },
            ];
        });

        setProductId('');
        setQuantity('1');
    };

    const handleQuantityChange = (id, value) => {
        setItems((previous) =>
            previous.map((item) =>
                String(item.productId) === String(id)
                    ? { ...item, quantity: value }
                    : item
            )
        );
    };

    const handleRemoveProduct = (id) => {
        setItems((previous) =>
            previous.filter(
                (item) => String(item.productId) !== String(id)
            )
        );
    };

    const totalQuantity = items.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    const handleSubmit = () => {
        if (items.length === 0) {
            alert('Vui lòng thêm ít nhất một sản phẩm.');
            return;
        }

        for (const item of items) {
            const amount = Number(item.quantity);

            if (!Number.isInteger(amount) || amount <= 0) {
                alert(`Số lượng của "${item.productName}" không hợp lệ.`);
                return;
            }

            const exists = products.some(
                (p) => String(p.id) === String(item.productId)
            );

            if (!exists) {
                alert(`Không tìm thấy sản phẩm "${item.productName}".`);
                return;
            }
        }

        const transactionDate = new Date().toISOString();

        const transactions = items.map((item, index) => {
            const product = products.find(
                (p) => String(p.id) === String(item.productId)
            );

            const stockBefore = Number(product.stock) || 0;
            const amount = Number(item.quantity);

            return {
                id: Date.now() + index,
                productId: item.productId,
                productName: item.productName,
                type: 'IN',
                quantity: amount,
                stockBefore,
                stockAfter: stockBefore + amount,
                note,
                date: transactionDate,
            };
        });

        const updatedProducts = products.map((product) => {
            const importedItem = items.find(
                (item) =>
                    String(item.productId) === String(product.id)
            );

            if (!importedItem) return product;

            return {
                ...product,
                stock:
                    (Number(product.stock) || 0) +
                    Number(importedItem.quantity),
            };
        });

        setProducts(updatedProducts);

        transactions.forEach((transaction) => {
            if (onAddTransaction) {
                onAddTransaction(transaction);
            }
        });

        const importedCount = items.length;
        const importedTotal = totalQuantity;

        setItems([]);
        setProductId('');
        setQuantity('1');
        setNote('');

        alert(
            `Nhập kho thành công ${importedCount} sản phẩm, tổng số lượng ${importedTotal}!`
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Nhập kho
            </Typography>

            <Card
                sx={{
                    maxWidth: 850,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={3}
                    >
                        <MoveToInbox color="primary" />

                        <Typography variant="h6" fontWeight="bold">
                            Phiếu nhập kho
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        <Chip
                            icon={<Inventory2Outlined />}
                            label={`${items.length} sản phẩm`}
                            color="primary"
                            variant="outlined"
                        />
                    </Stack>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            mb: 3,
                            bgcolor: '#fafafa',
                        }}
                    >
                        <Typography fontWeight="bold" mb={2}>
                            Thêm hàng hóa
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: '2fr 1fr auto',
                                },
                                gap: 2,
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                select
                                label="Chọn sản phẩm"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                fullWidth
                                size="small"
                            >
                                {products.map((product) => (
                                    <MenuItem
                                        key={product.id}
                                        value={String(product.id)}
                                    >
                                        {product.title} — Tồn: {product.stock}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Số lượng nhập"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                inputProps={{ min: 1 }}
                                fullWidth
                                size="small"
                            />

                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleAddProduct}
                                sx={{
                                    minWidth: 120,
                                    height: 40,
                                    textTransform: 'none',
                                }}
                            >
                                Thêm hàng
                            </Button>
                        </Box>
                    </Paper>

                    <Typography fontWeight="bold" mb={2}>
                        Danh sách hàng hóa nhập
                    </Typography>

                    {items.length === 0 ? (
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderStyle: 'dashed',
                                mb: 3,
                            }}
                        >
                            <Inventory2Outlined
                                sx={{ fontSize: 45, color: '#9ca3af', mb: 1 }}
                            />

                            <Typography color="text.secondary">
                                Chưa có sản phẩm nào trong phiếu nhập.
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Hãy chọn sản phẩm và nhấn Thêm hàng.
                            </Typography>
                        </Paper>
                    ) : (
                        <Stack spacing={1.5} mb={3}>
                            {items.map((item, index) => {
                                const product = products.find(
                                    (p) =>
                                        String(p.id) === String(item.productId)
                                );

                                return (
                                    <Paper
                                        key={item.productId}
                                        variant="outlined"
                                        sx={{ p: 2, borderRadius: 2 }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: {
                                                    xs: '1fr',
                                                    sm: '1fr 120px 45px',
                                                },
                                                gap: 2,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box>
                                                <Typography fontWeight="bold" fontSize={14}>
                                                    {index + 1}. {item.productName}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Tồn kho hiện tại: {product?.stock ?? 0}
                                                </Typography>
                                            </Box>

                                            <TextField
                                                size="small"
                                                type="number"
                                                label="Số lượng"
                                                value={item.quantity}
                                                inputProps={{ min: 1 }}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.productId,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleRemoveProduct(item.productId)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    )}

                    <Paper
                        sx={{
                            p: 2,
                            mb: 3,
                            borderRadius: 2,
                            bgcolor: '#eff6ff',
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography fontWeight="bold">
                                Tổng số sản phẩm:
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" color="primary">
                                {items.length}
                            </Typography>
                        </Stack>

                        <Divider sx={{ my: 1.5 }} />

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography fontWeight="bold">
                                Tổng số lượng nhập:
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" color="primary">
                                {totalQuantity}
                            </Typography>
                        </Stack>
                    </Paper>

                    <TextField
                        label="Ghi chú phiếu nhập"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ mb: 3 }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<MoveToInbox />}
                        onClick={handleSubmit}
                        disabled={items.length === 0}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            textTransform: 'none',
                        }}
                    >
                        Xác nhận nhập kho ({items.length} sản phẩm)
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
