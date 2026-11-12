
import { useEffect, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Box, CircularProgress, Typography } from '@mui/material';

import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';
import Transactions from './pages/Transactions';

import {
  getProducts,
  getCategories,
} from './api/inventoryApi';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        console.error('Lỗi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối mạng.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddTransaction = (transaction) => {
    setTransactions((previous) => [
      transaction,
      ...previous,
    ]);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Đang tải dữ liệu kho hàng...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Hãy kiểm tra kết nối Internet rồi tải lại trang.
        </Typography>
      </Box>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Dashboard
              products={products}
              transactions={transactions}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              products={products}
              setProducts={setProducts}
              categories={categories}
            />
          }
        />

        <Route
          path="/categories"
          element={
            <Categories
              categories={categories}
              setCategories={setCategories}
              products={products}
            />
          }
        />

        <Route
          path="/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/stock-in"
          element={
            <StockIn
              products={products}
              setProducts={setProducts}
              onAddTransaction={handleAddTransaction}
            />
          }
        />

        <Route
          path="/stock-out"
          element={
            <StockOut
              products={products}
              setProducts={setProducts}
              onAddTransaction={handleAddTransaction}
            />
          }
        />

        <Route
          path="/transactions"
          element={
            <Transactions transactions={transactions} />
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
