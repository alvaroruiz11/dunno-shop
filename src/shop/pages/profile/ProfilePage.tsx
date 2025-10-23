import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import {
  MapPin,
  Package,
  User,
  LogOut,
  Home,
  LayoutDashboard,
} from 'lucide-react';
import { ProfileInfo } from './ui/ProfileInfo';
import AddressManager from './ui/AddressManager';
import { OrderHistory } from './ui/OrderHistory';
import { HomeProfile } from './ui/HomeProfile';
import { useAuthStore } from '@/store/auth/auth.store';
import { Link } from 'react-router';

const tabs = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'info', label: 'Información personal', icon: User },
  { id: 'addresses', label: 'Direcciones', icon: MapPin },
  { id: 'orders', label: 'Historial de pedidos', icon: Package },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('home');

  const logout = useAuthStore((state) => state.logout);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeProfile />;
      case 'info':
        return <ProfileInfo />;
      case 'addresses':
        return <AddressManager />;
      case 'orders':
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-[#fafbfc] flex">
        <aside className="bg-white fixed md:sticky left-0 w-64 inset-y-0 min-w-64 h-screen border-r border-base-200 flex flex-col">
          <nav className="flex flex-col p-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant="ghost"
                className={cn(
                  `w-full mb-3 inline-flex items-center justify-start text-muted-foreground hover:bg-muted cursor-pointer ${
                    activeTab === tab.id ? 'bg-muted text-primary' : ''
                  }`
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
            {isAdmin && (
              <Button
                variant="ghost"
                className="w-full mb-3 inline-flex items-center justify-start text-muted-foreground hover:bg-muted cursor-pointer $"
                asChild
              >
                <Link to="/admin">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
            )}
            <Separator className="mb-4" />
            <Button
              variant="ghost"
              onClick={logout}
              className="inline-flex items-center justify-start hover:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="text-destructive" />
              <span className="text-destructive">Cerrar sesión</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
