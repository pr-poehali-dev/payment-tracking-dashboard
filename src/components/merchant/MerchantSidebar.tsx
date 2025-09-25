import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import Icon from '@/components/ui/icon';
import { MenuItem } from './types';

interface MerchantSidebarProps {
  menuItems: MenuItem[];
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export function MerchantSidebar({ menuItems, activeMenu, setActiveMenu }: MerchantSidebarProps) {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="CreditCard" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Merchant</h1>
            <p className="text-sm text-muted-foreground">Платёжная система для бизнеса</p>
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
  );
}