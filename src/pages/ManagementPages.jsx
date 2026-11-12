import React from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';

import { Add, Delete } from '@mui/icons-material';

const initialSuppliers = [
  {
    id: 1,
    name: 'Công ty TNHH Minh Phát',
    phone: '0901234567',
    email: 'minhphat@example.com',
    address: 'Đà Nẵng',
  },
  {
    id: 2,
    name: 'Công ty Thương mại An Khang',
    phone: '0912345678',
    email: 'ankhang@example.com',
    address: 'Hồ Chí Minh',
  },
  {
    id: 3,
    name: 'Nhà phân phối Đại Thành',
    phone: '0987654321',
    email: 'daithanh@example.com',
    address: 'Hà Nội',
  },
];

export function Categories({ categories, products }) {
  const [items, setItems] = React.useState(categories);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setItems((prev) => [...new Set([...prev, ...categories])]);
  }, [categories]);

  const add = () => {
    const value = name.trim().toLowerCase();

    if (!value) return;

    if (items.includes(value)) {
      alert('Danh mục đã tồn tại.');
      return;
    }

    setItems((prev) => [...prev, value]);
    setName('');
    setOpen(false);
  };

  const remove = (category) => {
    if (products.some((p) => p.category === category)) {
      alert('Không thể xóa danh mục đang có sản phẩm.');
      return;
    }

    if (window.confirm('Bạn có muốn xóa danh mục này?')) {
      setItems((prev) => prev.filter((item) => item !== category));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3} gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Quản lý danh mục
          </Typography>
          <Typography color="text.secondary">
            Phân loại các sản phẩm trong kho.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Thêm danh mục
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
        {items.map((item) => (
          <Box
            key={item}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #eee"
            py={1.5}
          >
            <Box>
              <Typography fontWeight={600}>{item}</Typography>
              <Typography color="text.secondary" fontSize={12}>
                {products.filter((p) => p.category === item).length} sản phẩm
              </Typography>
            </Box>

            <IconButton color="error" onClick={() => remove(item)}>
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Thêm danh mục</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={add}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export function Suppliers() {
  const [suppliers, setSuppliers] = React.useState(initialSuppliers);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Vui lòng nhập tên và số điện thoại.');
      return;
    }

    setSuppliers((prev) => [
      ...prev,
      { ...form, id: Date.now() },
    ]);

    setForm({ name: '', phone: '', email: '', address: '' });
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Xóa nhà cung cấp này?')) {
      setSuppliers((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3} gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Nhà cung cấp
          </Typography>
          <Typography color="text.secondary">
            Quản lý thông tin các nhà cung cấp hàng hóa.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Thêm nhà cung cấp
        </Button>
      </Box>

      <Stack spacing={2}>
        {suppliers.map((supplier) => (
          <Paper
            key={supplier.id}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #e5e7eb',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={2}
            >
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  {supplier.name}
                </Typography>
                <Typography color="text.secondary" mt={1}>
                  SĐT: {supplier.phone}
                </Typography>
                <Typography color="text.secondary">
                  Email: {supplier.email || 'Chưa cập nhật'}
                </Typography>
                <Typography color="text.secondary">
                  Địa chỉ: {supplier.address || 'Chưa cập nhật'}
                </Typography>
              </Box>

              <IconButton
                color="error"
                onClick={() => handleDelete(supplier.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Thêm nhà cung cấp</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {[
              ['name', 'Tên nhà cung cấp'],
              ['phone', 'Số điện thoại'],
              ['email', 'Email'],
              ['address', 'Địa chỉ'],
            ].map(([field, label]) => (
              <TextField
                key={field}
                label={label}
                fullWidth
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAdd}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}