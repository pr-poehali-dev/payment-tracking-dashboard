export const getStatusBadge = (status: string) => {
  const variants = {
    success: 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30',
    failed: 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
  };
  const labels = {
    success: 'Успешно',
    pending: 'В обработке',
    failed: 'Ошибка'
  };
  return {
    className: variants[status as keyof typeof variants],
    label: labels[status as keyof typeof labels]
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};