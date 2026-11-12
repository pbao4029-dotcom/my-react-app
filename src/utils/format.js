
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(Number(value) || 0);
};

export const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('vi-VN');
};

export const getStockStatus = (stock, minStock = 10) => {
  if (stock <= 0) {
    return {
      label: 'Hết hàng',
      color: 'error',
    };
  }

  if (stock <= minStock) {
    return {
      label: 'Sắp hết',
      color: 'warning',
    };
  }

  return {
    label: 'Còn hàng',
    color: 'success',
  };
};
