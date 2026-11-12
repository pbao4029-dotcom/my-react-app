
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
} from 'recharts';

import StatCard from '../components/StatCard';
import { formatCurrency } from '../utils/format';

export default function Dashboard({ products, transactions }) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.stock || 0),
    0
  );

  const lowStockProducts = products.filter(
    (item) => item.stock <= (item.minStock || 10)
  );

  const totalValue = products.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.stock || 0),
    0
  );

  const stockData = [
    {
      name: 'Còn hàng',
      value: products.filter((p) => p.stock > (p.minStock || 10)).length,
    },
    {
      name: 'Sắp hết',
      value: lowStockProducts.filter((p) => p.stock > 0).length,
    },
    {
      name: 'Hết hàng',
      value: products.filter((p) => p.stock <= 0).length,
    },
  ];

  const monthlyData = [
    { month: 'T1', nhap: 120, xuat: 80 },
    { month: 'T2', nhap: 150, xuat: 100 },
    { month: 'T3', nhap: 100, xuat: 70 },
    { month: 'T4', nhap: 180, xuat: 120 },
    { month: 'T5', nhap: 140, xuat: 90 },
    { month: 'T6', nhap: 200, xuat: 150 },
  ];

  const colors = ['#16a34a', '#f59e0b', '#dc2626'];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Tổng quan kho hàng
      </Typography>

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
          value={transactions.length}
          icon={<ReceiptLong />}
          color="#9333ea"
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 2,
          mb: 3,
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Thống kê nhập - xuất kho
            </Typography>

            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nhap" fill="#2563eb" name="Nhập kho" />
                  <Bar dataKey="xuat" fill="#f59e0b" name="Xuất kho" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Trạng thái tồn kho
            </Typography>

            <Box sx={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stockData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label
                  >
                    {stockData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={colors[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Typography fontWeight="bold" textAlign="center">
              {formatCurrency(totalValue)}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              textAlign="center"
            >
              Giá trị tồn kho ước tính
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Sản phẩm sắp hết hàng
          </Typography>

          {lowStockProducts.length === 0 ? (
            <Typography color="text.secondary">
              Không có sản phẩm nào sắp hết hàng.
            </Typography>
          ) : (
            lowStockProducts.slice(0, 8).map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px solid #e2e8f0',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography fontWeight="medium">
                    {product.title}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {product.category}
                  </Typography>
                </Box>

                <Chip
                  label={`${product.stock} sản phẩm`}
                  color={product.stock <= 0 ? 'error' : 'warning'}
                  size="small"
                />
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
