import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
} from '@mui/material';

import {
    Inventory,
    Warning,
    TrendingUp,
    ReceiptLong,
    TrendingDown,
} from '@mui/icons-material';

import StatCard from '../components/StatCard';
import { formatCurrency } from '../utils/format';

export default function Dashboard({
    products = [],
    transactions = [],
}) {
    // ==============================
    // THỐNG KÊ TỔNG QUAN
    // ==============================

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (sum, item) => sum + Number(item.stock || 0),
        0
    );

    const lowStockProducts = products.filter((item) => {
        const stock = Number(item.stock || 0);
        const minStock = Number(item.minStock || 10);

        return stock > 0 && stock <= minStock;
    });

    const outOfStockProducts = products.filter(
        (item) => Number(item.stock || 0) <= 0
    );

    const totalValue = products.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.stock || 0),
        0
    );

    const totalTransactions = transactions.length;

    const totalStockIn = transactions
        .filter((item) => item.type === 'IN')
        .reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
        );

    const totalStockOut = transactions
        .filter((item) => item.type === 'OUT')
        .reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
        );

    // ==============================
    // GIAO DIỆN
    // ==============================

    return (
        <Box sx={{ width: '100%' }}>

            {/* TIÊU ĐỀ */}
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
                    gap: 1,
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
                        Tổng quan kho hàng
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: '#64748b' }}
                    >
                        Theo dõi tình hình hoạt động và tồn kho
                    </Typography>
                </Box>

                <Chip
                    label="Hệ thống quản lý kho"
                    sx={{
                        bgcolor: '#dbeafe',
                        color: '#1d4ed8',
                        fontWeight: 700,
                        borderRadius: 2,
                    }}
                />
            </Box>

            {/* 4 THẺ THỐNG KÊ */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <StatCard
                    title="Tổng sản phẩm"
                    value={totalProducts}
                    icon={<Inventory />}
                    color="#2563eb"
                />

                <StatCard
                    title="Tổng tồn kho"
                    value={totalStock}
                    icon={<TrendingUp />}
                    color="#16a34a"
                />

                <StatCard
                    title="Sản phẩm sắp hết"
                    value={lowStockProducts.length}
                    icon={<Warning />}
                    color="#f59e0b"
                />

                <StatCard
                    title="Tổng giao dịch"
                    value={totalTransactions}
                    icon={<ReceiptLong />}
                    color="#9333ea"
                />
            </Box>

            {/* THỐNG KÊ NHẬP XUẤT */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, 1fr)',
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                {/* TỔNG NHẬP KHO */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '1px solid #e2e8f0',
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                mb: 2.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 2,
                                    bgcolor: '#dcfce7',
                                    color: '#16a34a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <TrendingUp />
                            </Box>

                            <Box>
                                <Typography
                                    fontWeight={800}
                                    color="#172554"
                                >
                                    Tổng nhập kho
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Tổng số lượng đã nhập
                                </Typography>
                            </Box>
                        </Box>

                        <Typography
                            variant="h4"
                            fontWeight={800}
                            color="#16a34a"
                        >
                            {totalStockIn.toLocaleString('vi-VN')}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            Sản phẩm
                        </Typography>
                    </CardContent>
                </Card>

                {/* TỔNG XUẤT KHO */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '1px solid #e2e8f0',
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                mb: 2.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 2,
                                    bgcolor: '#fee2e2',
                                    color: '#dc2626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <TrendingDown />
                            </Box>

                            <Box>
                                <Typography
                                    fontWeight={800}
                                    color="#172554"
                                >
                                    Tổng xuất kho
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Tổng số lượng đã xuất
                                </Typography>
                            </Box>
                        </Box>

                        <Typography
                            variant="h4"
                            fontWeight={800}
                            color="#dc2626"
                        >
                            {totalStockOut.toLocaleString('vi-VN')}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            Sản phẩm
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* GIÁ TRỊ TỒN KHO */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    mb: 3,
                }}
            >
                <CardContent sx={{ p: 2.5 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        Giá trị tồn kho
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        color="#1e40af"
                    >
                        {formatCurrency(totalValue)}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Tổng giá trị sản phẩm hiện có trong kho
                    </Typography>
                </CardContent>
            </Card>

            {/* DANH SÁCH SẢN PHẨM SẮP HẾT */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                }}
            >
                <CardContent sx={{ p: 2.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={800}
                                color="#172554"
                            >
                                Cảnh báo tồn kho
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Các sản phẩm cần chú ý
                            </Typography>
                        </Box>

                        <Chip
                            label={`${lowStockProducts.length + outOfStockProducts.length} sản phẩm`}
                            sx={{
                                bgcolor: '#fef3c7',
                                color: '#b45309',
                                fontWeight: 700,
                            }}
                        />
                    </Box>

                    {lowStockProducts.length === 0 &&
                    outOfStockProducts.length === 0 ? (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 4,
                            }}
                        >
                            <Inventory
                                sx={{
                                    fontSize: 45,
                                    color: '#16a34a',
                                    mb: 1,
                                }}
                            />

                            <Typography
                                color="#16a34a"
                                fontWeight={700}
                            >
                                Kho hàng đang hoạt động tốt!
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Không có sản phẩm nào cần bổ sung.
                            </Typography>
                        </Box>
                    ) : (
                        [...outOfStockProducts, ...lowStockProducts]
                            .slice(0, 10)
                            .map((product) => {
                                const isOut =
                                    Number(product.stock || 0) <= 0;

                                return (
                                    <Box
                                        key={product.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1.5,
                                            borderBottom: '1px solid #f1f5f9',
                                            gap: 2,
                                        }}
                                    >
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography
                                                fontWeight={700}
                                                color="#172554"
                                                sx={{
                                                    overflowWrap: 'anywhere',
                                                }}
                                            >
                                                {product.title || product.name}
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {product.category || 'Chưa phân loại'}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight={700}
                                                color={isOut ? '#dc2626' : '#d97706'}
                                            >
                                                {Number(product.stock || 0)} SP
                                            </Typography>

                                            <Chip
                                                size="small"
                                                label={isOut ? 'Hết hàng' : 'Sắp hết'}
                                                sx={{
                                                    bgcolor: isOut
                                                        ? '#fee2e2'
                                                        : '#fef3c7',
                                                    color: isOut
                                                        ? '#dc2626'
                                                        : '#b45309',
                                                    fontWeight: 700,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                );
                            })
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}