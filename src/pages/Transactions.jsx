
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

export default function Transactions({ transactions = [] }) {
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const filteredTransactions = useMemo(() => {
        return transactions.filter((item) => {
            const matchesType =
                filter === 'ALL' || item.type === filter;

            const transactionCode =
                item.transactionCode || `GD${item.id}`;

            const searchValue = search.toLowerCase();

            const matchesSearch =
                (item.productName || '')
                    .toLowerCase()
                    .includes(searchValue) ||
                String(transactionCode)
                    .toLowerCase()
                    .includes(searchValue);

            return matchesType && matchesSearch;
        });
    }, [transactions, filter, search]);

    const columns = [
        {
            field: 'transactionCode',
            headerName: 'Mã giao dịch',
            flex: 1,
            minWidth: 110,
            renderCell: (params) =>
                params.row.transactionCode || `GD${params.row.id}`,
        },
        {
            field: 'productName',
            headerName: 'Sản phẩm',
            flex: 1.4,
            minWidth: 120,
        },
        {
            field: 'type',
            headerName: 'Loại giao dịch',
            flex: 0.9,
            minWidth: 100,
            renderCell: (params) => (
                <Chip
                    label={
                        params.value === 'IN'
                            ? 'Nhập kho'
                            : 'Xuất kho'
                    }
                    color={
                        params.value === 'IN'
                            ? 'success'
                            : 'warning'
                    }
                    size="small"
                />
            ),
        },
        {
            field: 'quantity',
            headerName: 'Số lượng',
            flex: 0.65,
            minWidth: 75,
        },
        {
            field: 'stockBefore',
            headerName: 'Tồn trước',
            flex: 0.7,
            minWidth: 80,
        },
        {
            field: 'stockAfter',
            headerName: 'Tồn sau',
            flex: 0.7,
            minWidth: 80,
        },
        {
            field: 'date',
            headerName: 'Ngày giao dịch',
            flex: 0.95,
            minWidth: 105,
            renderCell: (params) => formatDate(params.value),
        },
        {
            field: 'note',
            headerName: 'Ghi chú',
            flex: 1,
            minWidth: 100,
        },
    ];

    return (
        <Box sx={{ width: '100%', minWidth: 0 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Lịch sử giao dịch
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 2,
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                <TextField
                    size="small"
                    label="Tìm theo mã hoặc tên sản phẩm"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{
                        width: { xs: '100%', sm: 280 },
                    }}
                />

                <TextField
                    select
                    size="small"
                    label="Loại giao dịch"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    sx={{
                        width: { xs: '100%', sm: 170 },
                    }}
                >
                    <MenuItem value="ALL">Tất cả</MenuItem>
                    <MenuItem value="IN">Nhập kho</MenuItem>
                    <MenuItem value="OUT">Xuất kho</MenuItem>
                </TextField>
            </Box>

            <Box
                sx={{
                    height: 540,
                    width: '100%',
                    minWidth: 0,
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiDataGrid-cell': {
                        px: 1,
                        fontSize: 13,
                    },
                    '& .MuiDataGrid-columnHeader': {
                        px: 1,
                        fontSize: 13,
                    },
                }}
            >
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
                    disableColumnMenu
                    density="compact"
                    sx={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: '#f8fafc',
                            fontWeight: 600,
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
