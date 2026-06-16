import { Link } from 'react-router-dom';
import { LayoutGrid, Plane, Globe, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';
import type { NavItem } from '../types';

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de Bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Voyages',
        href: '/voyages',
        icon: Plane,
    },
    {
        title: 'Destinations',
        href: '/dashboard#destinations',
        icon: Globe,
    },
    {
        title: 'Clients',
        href: '/dashboard#clients',
        icon: Users,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
