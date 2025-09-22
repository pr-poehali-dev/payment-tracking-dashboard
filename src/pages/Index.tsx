import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MerchantSidebar } from '@/components/merchant/MerchantSidebar';
import { MerchantHeader } from '@/components/merchant/MerchantHeader';
import { DashboardView } from '@/components/merchant/DashboardView';
import { TransactionsView } from '@/components/merchant/TransactionsView';
import { PlaceholderView } from '@/components/merchant/PlaceholderView';
import { menuItems } from '@/components/merchant/data';

function Index() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="dark">
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <MerchantSidebar 
            menuItems={menuItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <main className="flex-1 w-full overflow-x-hidden">
            <div className="w-full h-full overflow-y-auto">
              <div className="p-8 w-full">
                <MerchantHeader activeMenu={activeMenu} />

                {activeMenu === 'dashboard' && <DashboardView />}
                
                {activeMenu === 'transactions' && (
                  <TransactionsView 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                  />
                )}
                
                {(activeMenu === 'analytics' || activeMenu === 'support') && (
                  <PlaceholderView activeMenu={activeMenu} />
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Index;