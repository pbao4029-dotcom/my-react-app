
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
  Chip,
} from '@mui/material';

import { Add, Delete } from '@mui/icons-material';

export default function Categories({ categories, setCategories, products }) {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    const name = newCategory.trim().toLowerCase();

    if (!name) {
      alert('Vui lòng nhập tên danh mục.');
      return;
    }

    if (categories.some((item) => item.toLowerCase() === name)) {
      alert('Danh mục này đã tồn tại.');
      return;
    }

    setCategories((previous) => [...previous, name]);
    setNewCategory('');
    setOpen(false);
  };

  const handleDelete = (category) => {
    const used = products.some((product) => product.category === category);

    if (used) {
      alert('Không thể xóa danh mục đang có sản phẩm sử dụng.');
      return;
    }

    if (window.confirm(`Bạn có chắc muốn xóa danh mục "${category}"?`)) {
      setCategories((previous) =>
        previous.filter((item) => item !== category)
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
          Quản lý danh mục
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Thêm danh mục
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {categories.map((category) => {
          const count = products.filter(
            (product) => product.category === category
          ).length;

          return (
            <Card key={category} sx={{ borderRadius: 3 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography fontWeight="bold">
                    {category}
                  </Typography>

                  <Chip
                    label={`${count} sản phẩm`}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(category)}
                >
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Thêm danh mục mới</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên danh mục"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAdd}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
