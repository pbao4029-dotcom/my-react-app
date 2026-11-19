
import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
    Divider,
} from '@mui/material';

import {
    Inventory,
    Warning,
    TrendingUp,
    ReceiptLong,
    TrendingDown,
    AccountBalanceWallet,
} from '@mui/icons-material';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

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

    const lowStockProducts = products.filter(
        (item) => {
            const stock = Number(item.stock || 0);
            const minStock = Number(item.minStock || 10);

            return stock > 0 && stock <= minStock;
        }
    );

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
    // DỮ LIỆU BIỂU ĐỒ TRÒN
    // ==============================

    const stockData = [
        {
            name: 'Còn hàng',
            value: products.filter(
                (p) => Number(p.stock || 0) > Number(p.minStock || 10)
            ).length,
        },
        {
            name: 'Sắp hết',
            value: lowStockProducts.length,
        },
        {
            name: 'Hết hàng',
            value: outOfStockProducts.length,
        },
    ];

    const colors = ['#16a34a', '#f59e0b', '#dc2626'];

    // ==============================
    // BIỂU ĐỒ NHẬP - XUẤT 6 THÁNG
    // ==============================

    const now = new Date();

    const monthlyData = Array.from({ length: 6 }, (_, index) => {
        const monthDate = new Date(
            now.getFullYear(),
            now.getMonth() - (5 - index),
            1
        );

        const month = monthDate.getMonth();
        const year = monthDate.getFullYear();

        const monthTransactions = transactions.filter((item) => {
            if (!item.date) return false;

            const transactionDate = new Date(item.date);

            if (Number.isNaN(transactionDate.getTime())) {
                return false;
            }

            return (
                transactionDate.getMonth() === month &&
                transactionDate.getFullYear() === year
            );
        });

        const nhap = monthTransactions
            .filter((item) => item.type === 'IN')
            .reduce(
                (sum, item) => sum + Number(item.quantity || 0),
                0
            );

        const xuat = monthTransactions
            .filter((item) => item.type === 'OUT')
            .reduce(
                (sum, item) => sum + Number(item.quantity || 0),
                0
            );

        return {
            month: `T${month + 1}`,
            nhap,
            xuat,
        };
    });

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

            {/* BIỂU ĐỒ */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '2fr 1fr',
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                {/* BIỂU ĐỒ CỘT */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '1px solid #e2e8f0',
                        minWidth: 0,
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            color="#172554"
                        >
                            Thống kê nhập - xuất kho
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Số lượng sản phẩm trong 6 tháng gần nhất
                        </Typography>

                        <Box
                            sx={{
                                width: '100%',
                                height: 300,
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={monthlyData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -15,
                                        bottom: 5,
                                    }}
                                    barGap={6}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#e2e8f0"
                                    />

                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #e2e8f0',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        }}
                                    />

                                    <Legend />

                                    <Bar
                                        dataKey="nhap"
                                        fill="#2563eb"
                                        name="Nhập kho"
                                        radius={[5, 5, 0, 0]}
                                        maxBarSize={35}
                                    />

                                    <Bar
                                        dataKey="xuat"
                                        fill="#f59e0b"
                                        name="Xuất kho"
                                        radius={[5, 5, 0, 0]}
                                        maxBarSize={35}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>

                {/* BIỂU ĐỒ TRÒN */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '1px solid #e2e8f0',
                        minWidth: 0,
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            color="#172554"
                        >
                            Trạng thái tồn kho
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Phân loại sản phẩm hiện tại
                        </Typography>

                        <Box
                            sx={{
                                width: '100%',
                                height: 250,
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stockData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={48}
                                        outerRadius={85}
                                        paddingAngle={4}
                                        label
                                    >
                                        {stockData.map((entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={colors[index]}
                                                stroke="none"
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />

                                    <Legend
                                        verticalAlign="bottom"
                                        height={30}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Giá trị tồn kho
                            </Typography>

                            <AccountBalanceWallet
                                sx={{ color: '#2563eb' }}
                            />
                        </Box>

                        <Typography
                            variant="h5"
                            fontWeight={800}
                            color="#1e40af"
                            sx={{ mt: 1 }}
                        >
                            {formatCurrency(totalValue)}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

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
