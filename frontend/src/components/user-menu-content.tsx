import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { UserInfo } from './user-info';
import { useAuth } from '../contexts/auth-context';
import type { User } from '../types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate('/settings/profile')}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
                data-test="logout-button"
            >
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
            </DropdownMenuItem>
        </>
    );
}
