
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

export default function Products({
  products = [],
  setProducts,
  categories = [],
}) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        (product.title || '').toLowerCase().includes(search.toLowerCase()) ||
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

      setProducts((previous) =>
        previous.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert('Không thể xóa sản phẩm.');
    }
  };

  // Lưu dữ liệu khi chỉnh sửa trực tiếp trên bảng
  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const updatedRow = {
        ...newRow,
        title: (newRow.title || '').trim(),
        brand: newRow.brand || '',
        price: Number(newRow.price),
        stock: Number(newRow.stock),
      };

      if (!updatedRow.title) {
        throw new Error('Tên sản phẩm không được để trống.');
      }

      if (!updatedRow.category) {
        throw new Error('Vui lòng chọn danh mục.');
      }

      if (
        updatedRow.price < 0 ||
        updatedRow.stock < 0
      ) {
        throw new Error('Giá và số lượng không được âm.');
      }

      await editProduct(updatedRow.id, updatedRow);

      setProducts((previous) =>
        previous.map((item) =>
          item.id === updatedRow.id
            ? { ...item, ...updatedRow }
            : item
        )
      );

      return updatedRow;
    } catch (error) {
      console.error(error);
      alert(error.message || 'Không thể cập nhật sản phẩm.');
      throw error;
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.45,
      minWidth: 55,
    },
    {
      field: 'title',
      headerName: 'Tên sản phẩm',
      flex: 1.5,
      minWidth: 120,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Danh mục',
      flex: 0.9,
      minWidth: 90,
      type: 'singleSelect',
      valueOptions: categories,
      editable: true,
    },
    {
      field: 'brand',
      headerName: 'Thương hiệu',
      flex: 0.8,
      minWidth: 85,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Giá',
      flex: 0.9,
      minWidth: 95,
      type: 'number',
      editable: true,
      renderCell: (params) => formatCurrency(params.row.price),
    },
    {
      field: 'stock',
      headerName: 'Tồn kho',
      flex: 0.6,
      minWidth: 65,
      type: 'number',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 0.75,
      minWidth: 85,
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
            sx={{
              fontSize: 11,
              height: 24,
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      flex: 0.8,
      minWidth: 85,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            size="small"
            onClick={() => handleOpenEdit(params.row)}
            sx={{ minWidth: 32, px: 0.5 }}
          >
            <Edit fontSize="small" />
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            sx={{ minWidth: 32, px: 0.5 }}
          >
            <Delete fontSize="small" />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2.5,
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
          sx={{ textTransform: 'none' }}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          size="small"
          label="Tìm kiếm sản phẩm"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: { xs: '100%', sm: 240 } }}
        />

        <TextField
          select
          size="small"
          label="Danh mục"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          sx={{ width: { xs: '100%', sm: 180 } }}
        >
          <MenuItem value="">Tất cả danh mục</MenuItem>

          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          height: 540,
          width: '100%',
          minWidth: 0,
          bgcolor: '#fff',
          overflow: 'hidden',
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: '#f8fafc',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            px: 1,
          },
          '& .MuiDataGrid-columnHeader': {
            px: 1,
          },
          '& .MuiDataGrid-cell--editing': {
            bgcolor: '#eff6ff',
          },
        }}
      >
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
          disableColumnMenu
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => console.error(error)}
          sx={{
            border: '1px solid #e2e8f0',
            borderRadius: 2,
            '& .MuiDataGrid-row:hover': {
              bgcolor: '#f8fafc',
            },
          }}
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
