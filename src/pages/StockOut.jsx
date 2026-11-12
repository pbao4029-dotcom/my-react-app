
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

import { Outbox } from '@mui/icons-material';

export default function StockOut({
  products,
  setProducts,
  onAddTransaction,
}) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const selectedProduct = products.find(
    (item) => String(item.id) === String(productId)
  );

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
      alert('Số lượng xuất phải là số nguyên lớn hơn 0.');
      return;
    }

    if (amount > product.stock) {
      alert('Số lượng xuất vượt quá tồn kho hiện tại.');
      return;
    }

    const stockBefore = Number(product.stock);
    const stockAfter = stockBefore - amount;

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
      type: 'OUT',
      quantity: amount,
      stockBefore,
      stockAfter,
      note,
      date: new Date().toISOString(),
    });

    setProductId('');
    setQuantity(1);
    setNote('');

    alert('Xuất kho thành công!');
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Xuất kho
      </Typography>

      <Card sx={{ maxWidth: 650, borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Outbox color="warning" />

            <Typography variant="h6" fontWeight="bold">
              Phiếu xuất kho
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

            {selectedProduct && (
              <Typography color="text.secondary">
                Tồn kho hiện tại: {selectedProduct.stock}
              </Typography>
            )}

            <TextField
              label="Số lượng xuất"
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
              color="warning"
              size="large"
              startIcon={<Outbox />}
              onClick={handleSubmit}
            >
              Xác nhận xuất kho
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
