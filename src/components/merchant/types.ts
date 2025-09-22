export interface Transaction {
  id: string;
  terminal: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  method: string;
  date: string;
  commission: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

export interface ChartDataItem {
  date: string;
  revenue: number;
  transactions: number;
}