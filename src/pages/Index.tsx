import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Icon from '@/components/ui/icon';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Transaction {
  id: string;
  terminal: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  method: string;
  date: string;
  commission: number;
}

const chartData = [
  { date: '01', revenue: 85000, transactions: 245 },
  { date: '02', revenue: 92000, transactions: 280 },
  { date: '03', revenue: 78000, transactions: 220 },
  { date: '04', revenue: 95000, transactions: 310 },
  { date: '05', revenue: 88000, transactions: 265 },
  { date: '06', revenue: 102000, transactions: 340 },
  { date: '07', revenue: 89000, transactions: 275 },
  { date: '08', revenue: 115000, transactions: 390 },
  { date: '09', revenue: 98000, transactions: 295 },
  { date: '10', revenue: 87000, transactions: 250 },
  { date: '11', revenue: 125000, transactions: 420 },
  { date: '12', revenue: 132000, transactions: 465 },
  { date: '13', revenue: 98000, transactions: 285 },
  { date: '14', revenue: 108000, transactions: 325 },
  { date: '15', revenue: 115000, transactions: 380 },
];

const transactions: Transaction[] = [
  {
    id: '3a1bf35b-3d28-80cf-98dc-109a55faf2fa',
    terminal: 'ddostup.ru',
    amount: 1585087.00,
    currency: 'RUB',
    status: 'success',
    method: 'СБП (6.5%)',
    date: '2025-09-22T10:30:00',
    commission: 103031.66
  },
  {
    id: '3a1bf35c-0afa-7ea9-4217-5ea37637fc85',
    terminal: 'poehali.dev',
    amount: 289458.00,
    currency: 'RUB',
    status: 'success',
    method: 'СБП (6.5%)',
    date: '2025-09-22T09:15:00',
    commission: 18814.77
  },
  {
    id: '7b2cf46d-4e39-91dg-09ed-210b66gbg3gb',
    terminal: 'shop.example.com',
    amount: 45670.00,
    currency: 'RUB',
    status: 'pending',
    method: 'Карта (2.8%)',
    date: '2025-09-22T11:45:00',
    commission: 1278.76
  },
  {
    id: '8c3dg57e-5f4a-02eh-10fe-321c77hch4hc',
    terminal: 'service.tech',
    amount: 156890.00,
    currency: 'RUB',
    status: 'failed',
    method: 'YooMoney (3.5%)',
    date: '2025-09-22T08:20:00',
    commission: 5491.15
  },
  {
    id: '9d4eh68f-6g5b-13fi-21gf-432d88idi5id',
    terminal: 'marketplace.online',
    amount: 78930.00,
    currency: 'RUB',
    status: 'success',
    method: 'СБП (6.5%)',
    date: '2025-09-22T07:10:00',
    commission: 5130.45
  }
];

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: 'BarChart3' },
  { id: 'transactions', label: 'Транзакции', icon: 'CreditCard' },
  { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
  { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
];

function Index() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalRevenue = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, []);

  const totalCommission = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.commission, 0);
  }, []);

  const successfulTransactions = useMemo(() => {
    return transactions.filter(tx => tx.status === 'success').length;
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.terminal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
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
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
    <div className="dark">
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <Sidebar className="border-r border-border">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Merchant</h1>
                <p className="text-sm text-muted-foreground">Эквайринг система</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeMenu === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {activeMenu === 'dashboard' && 'Дашборд'}
                  {activeMenu === 'transactions' && 'Транзакции'}
                  {activeMenu === 'analytics' && 'Аналитика'}
                  {activeMenu === 'support' && 'Поддержка'}
                </h1>
                <p className="text-muted-foreground">
                  {activeMenu === 'dashboard' && 'Превратите свою идею в полноценный сайт за считанные минуты'}
                  {activeMenu === 'transactions' && 'Управление и мониторинг всех платежей'}
                  {activeMenu === 'analytics' && 'Детальная аналитика по платежам и доходам'}
                  {activeMenu === 'support' && 'Техническая поддержка 24/7'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Поддержка 24/7
                </Button>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">ДС</span>
                </div>
              </div>
            </div>

            {activeMenu === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Оборот</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {formatCurrency(totalRevenue)}
                      </div>
                      <p className="text-sm text-green-400 mt-1">+12.5% к прошлому месяцу</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Доход</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {formatCurrency(totalRevenue - totalCommission)}
                      </div>
                      <p className="text-sm text-green-400 mt-1">+8.2% к прошлому месяцу</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Транзакции</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{successfulTransactions}</div>
                      <p className="text-sm text-green-400 mt-1">Успешных операций</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Динамика доходов - Сентябрь 2025</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#F9FAFB'
                            }}
                            formatter={(value: any) => [formatCurrency(value), 'Доход']}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#8B5CF6" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorRevenue)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Топ терминалы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {transactions.slice(0, 3).map((tx, index) => (
                          <div key={tx.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                                <Icon name="Globe" size={16} className="text-foreground" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{tx.terminal}</p>
                                <p className="text-sm text-muted-foreground">{tx.id.slice(0, 8)}...</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{formatCurrency(tx.amount)}</p>
                              <p className="text-sm text-muted-foreground">{tx.method}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Методы платежей</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { method: 'СБП', count: 12, color: '#8B5CF6' },
                            { method: 'Карта', count: 8, color: '#06B6D4' },
                            { method: 'YooMoney', count: 3, color: '#84CC16' }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="method" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#F9FAFB'
                              }}
                            />
                            <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeMenu === 'transactions' && (
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
            )}

            {(activeMenu === 'analytics' || activeMenu === 'support') && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon name="Construction" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Раздел в разработке</h3>
                  <p className="text-muted-foreground">
                    {activeMenu === 'analytics' 
                      ? 'Детальная аналитика и отчеты будут доступны в ближайшее время'
                      : 'Система поддержки находится в разработке'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Index;