import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { formatCurrency, formatDate, getStatusBadge } from './utils';
import { transactions } from './data';
import { Transaction } from './types';

interface TransactionsViewProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function TransactionsView({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: TransactionsViewProps) {
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.terminal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const exportToCSV = () => {
    const headers = ['ID транзакции', 'Терминал', 'Сумма', 'Валюта', 'Статус', 'Метод', 'Дата', 'Комиссия'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(tx => [
        tx.id,
        tx.terminal,
        tx.amount,
        tx.currency,
        tx.status,
        tx.method,
        tx.date,
        tx.commission
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const data = filteredTransactions.map(tx => ({
      'ID транзакции': tx.id,
      'Терминал': tx.terminal,
      'Сумма': tx.amount,
      'Валюта': tx.currency,
      'Статус': tx.status,
      'Метод': tx.method,
      'Дата': formatDate(tx.date),
      'Комиссия': tx.commission
    }));

    const worksheet = JSON.stringify(data);
    const blob = new Blob([worksheet], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск по терминалу или ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="success">Успешно</SelectItem>
            <SelectItem value="pending">В обработке</SelectItem>
            <SelectItem value="failed">Ошибка</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            CSV
          </Button>
          <Button onClick={exportToExcel} variant="outline" size="sm">
            <Icon name="FileSpreadsheet" size={16} className="mr-2" />
            Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Терминал</TableHead>
                <TableHead>ID транзакции</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Метод</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Комиссия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon name="Globe" size={16} className="text-muted-foreground" />
                      <span className="font-medium">{transaction.terminal}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded">
                      {transaction.id.slice(0, 8)}...
                    </code>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatCurrency(transaction.commission)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}