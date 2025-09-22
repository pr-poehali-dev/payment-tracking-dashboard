import { Transaction, MenuItem, ChartDataItem } from './types';

export const chartData: ChartDataItem[] = [
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

export const transactions: Transaction[] = [
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

export const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Дашборд', icon: 'BarChart3' },
  { id: 'transactions', label: 'Транзакции', icon: 'CreditCard' },
  { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
  { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
];