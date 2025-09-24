import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MerchantHeaderProps {
  activeMenu: string;
}

export function MerchantHeader({ activeMenu }: MerchantHeaderProps) {
  const { user, logout } = useAuth();
  
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
    <div className="px-8 pt-8">
      <div className="flex items-center justify-between">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
                <Icon name="ChevronDown" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled>
                <Icon name="User" size={16} className="mr-2" />
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}