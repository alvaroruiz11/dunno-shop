import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';
// import { SideBar } from '../components/sidebar/SideBar';
// import { SidebarProvider } from '@/components/ui/sidebar';
import { SideBar } from '../components/SideBar';

export const AdminLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="flex">
        <SideBar />
        {/* <SideBar /> */}
        <div className="overflow-auto flex-col flex grow min-w-0 h-screen">
          <NavBar />
          <main className="bg-[#fafbfc] p-6 grow transition-all">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
