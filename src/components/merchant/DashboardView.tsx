import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '@/components/ui/icon';
import { formatCurrency } from './utils';
import { transactions, chartData } from './data';

export function DashboardView() {
  const totalRevenue = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, []);

  const totalCommission = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.commission, 0);
  }, []);

  const successfulTransactions = useMemo(() => {
    return transactions.filter(tx => tx.status === 'success').length;
  }, []);

  return (
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
              {transactions.slice(0, 3).map((tx) => (
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
  );
}