import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useSidebarStore } from '@/lib/store';

export function MainLayout() {
  const { isOpen } = useSidebarStore();

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}