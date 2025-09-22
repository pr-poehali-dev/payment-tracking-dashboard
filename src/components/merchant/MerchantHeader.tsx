import { Button } from '@/components/ui/button';

interface MerchantHeaderProps {
  activeMenu: string;
}

export function MerchantHeader({ activeMenu }: MerchantHeaderProps) {
  const titles: Record<string, string> = {
    dashboard: 'Дашборд',
    transactions: 'Транзакции',
    analytics: 'Аналитика',
    support: 'Поддержка'
  };

  const descriptions: Record<string, string> = {
    dashboard: 'Превратите свою идею в полноценный сайт за считанные минуты',
    transactions: 'Управление и мониторинг всех платежей',
    analytics: 'Детальная аналитика по платежам и доходам',
    support: 'Техническая поддержка 24/7'
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {titles[activeMenu]}
        </h1>
        <p className="text-muted-foreground">
          {descriptions[activeMenu]}
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
  );
}