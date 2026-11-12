
import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { MoveToInbox } from '@mui/icons-material';

export default function StockIn({
  products,
  setProducts,
  onAddTransaction,
}) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    const product = products.find(
      (item) => String(item.id) === String(productId)
    );

    const amount = Number(quantity);

    if (!product) {
      alert('Vui lòng chọn sản phẩm.');
      return;
    }

    if (!Number.isInteger(amount) || amount <= 0) {
      alert('Số lượng nhập phải là số nguyên lớn hơn 0.');
      return;
    }

    const stockBefore = Number(product.stock);
    const stockAfter = stockBefore + amount;

    setProducts((previous) =>
      previous.map((item) =>
        item.id === product.id
          ? { ...item, stock: stockAfter }
          : item
      )
    );

    onAddTransaction({
      id: Date.now(),
      productId: product.id,
      productName: product.title,
      type: 'IN',
      quantity: amount,
      stockBefore,
      stockAfter,
      note,
      date: new Date().toISOString(),
    });

    setProductId('');
    setQuantity(1);
    setNote('');

    alert('Nhập kho thành công!');
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Nhập kho
      </Typography>

      <Card sx={{ maxWidth: 650, borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <MoveToInbox color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Phiếu nhập kho
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              select
              label="Chọn sản phẩm"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              fullWidth
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.title} — Tồn: {product.stock}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Số lượng nhập"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              inputProps={{ min: 1 }}
              fullWidth
            />

            <TextField
              label="Ghi chú"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              startIcon={<MoveToInbox />}
              onClick={handleSubmit}
            >
              Xác nhận nhập kho
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
