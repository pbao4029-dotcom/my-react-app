
import React, { useEffect, useState } from 'react';

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
  Grid,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';

import {
  Add,
  Delete,
  Category,
  Inventory2,
  Storefront,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

// ==================== DỮ LIỆU NHÀ CUNG CẤP ====================

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

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
};

// ==================== QUẢN LÝ DANH MỤC ====================

export function Categories({
  categories = [],
  setCategories,
  products = [],
}) {
  const [items, setItems] = useState(categories);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const handleAdd = () => {
    const value = name.trim();

    if (!value) {
      alert('Vui lòng nhập tên danh mục.');
      return;
    }

    const exists = items.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      alert('Danh mục đã tồn tại.');
      return;
    }

    if (setCategories) {
      setCategories((prev) => [...prev, value]);
    } else {
      setItems((prev) => [...prev, value]);
    }

    setName('');
    setOpen(false);
  };

  const handleRemove = (category) => {
    const isUsed = products.some(
      (product) => product.category === category
    );

    if (isUsed) {
      alert('Không thể xóa danh mục đang có sản phẩm.');
      return;
    }

    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      if (setCategories) {
        setCategories((prev) =>
          prev.filter((item) => item !== category)
        );
      } else {
        setItems((prev) =>
          prev.filter((item) => item !== category)
        );
      }
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        mb={4}
      >
        <Box>
          <Typography variant="h5" fontWeight={800} color="#172554">
            Quản lý danh mục
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Phân loại và quản lý các sản phẩm trong kho hàng.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 2.5,
            px: 3,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            },
          }}
        >
          Thêm danh mục
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#dbeafe',
                color: '#2563eb',
                borderRadius: 2,
              }}
            >
              <Category />
            </Avatar>

            <Box>
              <Typography color="text.secondary" fontSize={13}>
                Tổng danh mục
              </Typography>
              <Typography variant="h5" fontWeight={800} color="#172554">
                {items.length}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#dcfce7',
                color: '#16a34a',
                borderRadius: 2,
              }}
            >
              <Inventory2 />
            </Avatar>

            <Box>
              <Typography color="text.secondary" fontSize={13}>
                Tổng sản phẩm
              </Typography>
              <Typography variant="h5" fontWeight={800} color="#172554">
                {products.length}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {items.length > 0 ? (
          items.map((item, index) => {
            const count = products.filter(
              (product) => product.category === item
            ).length;

            return (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    transition: '0.25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
                      borderColor: '#93c5fd',
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar
                        sx={{
                          bgcolor: '#eff6ff',
                          color: '#2563eb',
                          borderRadius: 2,
                        }}
                      >
                        <Category />
                      </Avatar>

                      <Box>
                        <Typography fontWeight={700} color="#172554">
                          {item}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                          Danh mục #{index + 1}
                        </Typography>
                      </Box>
                    </Stack>

                    <IconButton
                      onClick={() => handleRemove(item)}
                      sx={{
                        color: '#ef4444',
                        bgcolor: '#fef2f2',
                        '&:hover': {
                          bgcolor: '#fee2e2',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>

                  <Box
                    mt={2.5}
                    pt={2}
                    borderTop="1px solid #f1f5f9"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontSize={13} color="text.secondary">
                      Số lượng sản phẩm
                    </Typography>

                    <Chip
                      label={`${count} sản phẩm`}
                      size="small"
                      sx={{
                        bgcolor: '#dbeafe',
                        color: '#1d4ed8',
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 5,
                textAlign: 'center',
                borderRadius: 3,
              }}
            >
              <Category sx={{ fontSize: 48, color: '#94a3b8' }} />
              <Typography fontWeight={700}>
                Chưa có danh mục nào
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle fontWeight={800} color="#172554">
          Thêm danh mục mới
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên danh mục"
            placeholder="Ví dụ: Đồ điện tử"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ==================== QUẢN LÝ NHÀ CUNG CẤP ====================

export function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdd = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Vui lòng nhập tên và số điện thoại.');
      return;
    }

    setSuppliers((prev) => [
      ...prev,
      {
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        id: Date.now(),
      },
    ]);

    setForm(emptyForm);
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhà cung cấp này?')) {
      setSuppliers((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        mb={4}
      >
        <Box>
          <Typography variant="h5" fontWeight={800} color="#172554">
            Quản lý nhà cung cấp
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Quản lý thông tin các đối tác cung cấp hàng hóa.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 2.5,
            px: 3,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            },
          }}
        >
          Thêm nhà cung cấp
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#dbeafe',
            color: '#2563eb',
            borderRadius: 2,
          }}
        >
          <Storefront />
        </Avatar>

        <Box>
          <Typography fontSize={13} color="text.secondary">
            Tổng số nhà cung cấp
          </Typography>
          <Typography variant="h5" fontWeight={800} color="#172554">
            {suppliers.length}
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <Grid item xs={12} md={6} lg={4} key={supplier.id}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  transition: '0.25s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
                    borderColor: '#93c5fd',
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        bgcolor: '#eff6ff',
                        color: '#2563eb',
                        borderRadius: 2,
                      }}
                    >
                      <Storefront />
                    </Avatar>

                    <Box>
                      <Typography fontWeight={700} color="#172554">
                        {supplier.name}
                      </Typography>
                      <Typography fontSize={12} color="text.secondary">
                        Nhà cung cấp
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton
                    onClick={() => handleDelete(supplier.id)}
                    sx={{
                      color: '#ef4444',
                      bgcolor: '#fef2f2',
                      '&:hover': {
                        bgcolor: '#fee2e2',
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Phone sx={{ fontSize: 19, color: '#2563eb' }} />
                    <Typography fontSize={13} color="#475569">
                      {supplier.phone}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Email sx={{ fontSize: 19, color: '#2563eb' }} />
                    <Typography
                      fontSize={13}
                      color="#475569"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {supplier.email || 'Chưa cập nhật'}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <LocationOn sx={{ fontSize: 19, color: '#2563eb' }} />
                    <Typography fontSize={13} color="#475569">
                      {supplier.address || 'Chưa cập nhật'}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 5,
                textAlign: 'center',
                borderRadius: 3,
              }}
            >
              <Storefront sx={{ fontSize: 48, color: '#94a3b8' }} />
              <Typography fontWeight={700}>
                Chưa có nhà cung cấp
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle fontWeight={800} color="#172554">
          Thêm nhà cung cấp mới
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Tên nhà cung cấp"
              fullWidth
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />

            <TextField
              label="Số điện thoại"
              fullWidth
              required
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />

            <TextField
              label="Địa chỉ"
              fullWidth
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            Lưu nhà cung cấp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
