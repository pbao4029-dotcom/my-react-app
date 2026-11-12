
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
} from '@mui/material';

import { Add, Delete } from '@mui/icons-material';

const initialSuppliers = [
  {
    id: 1,
    name: 'Công ty ABC',
    phone: '0901234567',
    email: 'abc@example.com',
    address: 'Đà Nẵng',
  },
  {
    id: 2,
    name: 'Công ty XYZ',
    phone: '0912345678',
    email: 'xyz@example.com',
    address: 'Hà Nội',
  },
];

const emptySupplier = {
  name: '',
  phone: '',
  email: '',
  address: '',
};

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptySupplier);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAdd = () => {
    if (!form.name.trim()) {
      alert('Vui lòng nhập tên nhà cung cấp.');
      return;
    }

    setSuppliers((previous) => [
      ...previous,
      {
        ...form,
        id: Date.now(),
      },
    ]);

    setForm(emptySupplier);
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhà cung cấp này?')) {
      setSuppliers((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Quản lý nhà cung cấp
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Thêm nhà cung cấp
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 2,
        }}
      >
        {suppliers.map((supplier) => (
          <Card key={supplier.id} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {supplier.name}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(supplier.id)}
                >
                  <Delete />
                </IconButton>
              </Box>

              <Typography color="text.secondary" mt={1}>
                Điện thoại: {supplier.phone || 'Chưa cập nhật'}
              </Typography>

              <Typography color="text.secondary">
                Email: {supplier.email || 'Chưa cập nhật'}
              </Typography>

              <Typography color="text.secondary">
                Địa chỉ: {supplier.address || 'Chưa cập nhật'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Thêm nhà cung cấp</DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField
              label="Tên nhà cung cấp"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Địa chỉ"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAdd}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
