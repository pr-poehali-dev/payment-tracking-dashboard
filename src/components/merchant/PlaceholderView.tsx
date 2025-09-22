import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PlaceholderViewProps {
  activeMenu: string;
}

export function PlaceholderView({ activeMenu }: PlaceholderViewProps) {
  return (
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
  );
}