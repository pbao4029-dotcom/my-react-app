
import { useMemo, useState } from 'react';

import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Chip,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import { formatDate } from '../utils/format';

export default function Transactions({ transactions }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesType = filter === 'ALL' || item.type === filter;

      const matchesSearch = (item.productName || '')
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [transactions, filter, search]);

  const columns = [
    {
      field: 'id',
      headerName: 'Mã giao dịch',
      width: 130,
    },
    {
      field: 'productName',
      headerName: 'Sản phẩm',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'type',
      headerName: 'Loại giao dịch',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value === 'IN' ? 'Nhập kho' : 'Xuất kho'}
          color={params.value === 'IN' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      width: 100,
    },
    {
      field: 'stockBefore',
      headerName: 'Tồn trước',
      width: 110,
    },
    {
      field: 'stockAfter',
      headerName: 'Tồn sau',
      width: 110,
    },
    {
      field: 'date',
      headerName: 'Ngày giao dịch',
      width: 140,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      flex: 1,
      minWidth: 150,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Lịch sử giao dịch
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          label="Tìm theo tên sản phẩm"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <TextField
          select
          size="small"
          label="Loại giao dịch"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          sx={{ minWidth: 170 }}
        >
          <MenuItem value="ALL">Tất cả</MenuItem>
          <MenuItem value="IN">Nhập kho</MenuItem>
          <MenuItem value="OUT">Xuất kho</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ height: 540, width: '100%', bgcolor: '#fff' }}>
        <DataGrid
          rows={filteredTransactions}
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
    </Box>
  );
}
