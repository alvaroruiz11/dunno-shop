import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth/auth.store';
import { DropdownMenuUser } from './DropdownMenuUser';

export const NavBar = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();

  return (
    <nav className="bg-white px-6 sticky top-0 min-h-16 max-h-16 border-b border-base-200 h-full z-40">
      <div className="flex justify-between items-center h-full">
        <div>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        <div className="inline-flex gap-1.5 items-center">
          <DropdownMenuUser logout={logout}>
            <Button variant="ghost" className="p-1.5">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarFallback>
                    {user?.firstName.charAt(0)}
                    {user?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.firstName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.roles[0]}
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuUser>
        </div>
      </div>
    </nav>
  );
};
