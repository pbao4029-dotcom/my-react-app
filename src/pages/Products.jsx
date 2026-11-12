
import { useMemo, useState } from 'react';

import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
} from '@mui/material';

import { Add, Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import {
  addProduct,
  editProduct,
  removeProduct,
} from '../api/inventoryApi';

import { formatCurrency, getStockStatus } from '../utils/format';

const emptyForm = {
  title: '',
  category: '',
  brand: '',
  price: 0,
  stock: 0,
  minStock: 10,
};

export default function Products({ products, setProducts, categories }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        (product.brand || '').toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      category: categories[0] || '',
    });
    setOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title || '',
      category: product.category || '',
      brand: product.brand || '',
      price: product.price || 0,
      stock: product.stock || 0,
      minStock: product.minStock || 10,
    });
    setOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: ['price', 'stock', 'minStock'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.category) {
      alert('Vui lòng nhập tên sản phẩm và chọn danh mục.');
      return;
    }

    try {
      if (editingId !== null) {
        await editProduct(editingId, form);

        setProducts((previous) =>
          previous.map((item) =>
            item.id === editingId ? { ...item, ...form } : item
          )
        );
      } else {
        const result = await addProduct(form);

        setProducts((previous) => [
          {
            ...form,
            id: result.id || Date.now(),
            thumbnail: '',
            description: '',
          },
          ...previous,
        ]);
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert('Không thể lưu sản phẩm. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      return;
    }

    try {
      await removeProduct(id);
      setProducts((previous) => previous.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Không thể xóa sản phẩm.');
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 75,
    },
    {
      field: 'title',
      headerName: 'Tên sản phẩm',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'category',
      headerName: 'Danh mục',
      width: 150,
    },
    {
      field: 'brand',
      headerName: 'Thương hiệu',
      width: 130,
    },
    {
      field: 'price',
      headerName: 'Giá',
      width: 140,
      renderCell: (params) => formatCurrency(params.row.price),
    },
    {
      field: 'stock',
      headerName: 'Tồn kho',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => {
        const status = getStockStatus(
          params.row.stock,
          params.row.minStock
        );

        return (
          <Chip
            label={status.label}
            color={status.color}
            size="small"
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            onClick={() => handleOpenEdit(params.row)}
          >
            <Edit fontSize="small" />
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete fontSize="small" />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Quản lý sản phẩm
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAdd}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          label="Tìm kiếm sản phẩm"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ minWidth: 220 }}
        />

        <TextField
          select
          size="small"
          label="Danh mục"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">Tất cả danh mục</MenuItem>

          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ height: 540, width: '100%', bgcolor: '#fff' }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingId !== null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField
              label="Tên sản phẩm"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Danh mục"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Thương hiệu"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Giá sản phẩm"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Số lượng tồn kho"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Mức tồn kho tối thiểu"
              name="minStock"
              type="number"
              value={form.minStock}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Hủy
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
