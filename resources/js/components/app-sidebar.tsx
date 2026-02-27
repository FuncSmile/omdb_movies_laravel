'use client';

import { Link } from '@inertiajs/react';
import { Film, Heart, LayoutGrid, Star } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Favorites',
        href: '/my-favorites',
        icon: Heart,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'GitHub',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Film,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: Star,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-sidebar-border/50">
            <SidebarHeader className="border-b border-sidebar-border/50 bg-sidebar/50 backdrop-blur-sm">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="group/menu-button">
                            <Link href={dashboard()} prefetch className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-md group-data-[collapsible=icon]:bg-gradient-to-br">
                                    <Film className="h-5 w-5 text-white" />
                                </div>
                                <div className="grid flex-1 text-left transition-all group-data-[collapsible=icon]:opacity-0">
                                    <span className="truncate font-semibold text-base text-foreground">
                                        OMDB<span className="text-red-500">Movies</span>
                                    </span>
                                    <small className="truncate text-xs text-muted-foreground">
                                        Discover & save favorites
                                    </small>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-transparent">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/50 bg-sidebar/50 backdrop-blur-sm">
                <NavFooter items={footerNavItems} />
                <NavUser />
            </SidebarFooter>

            <SidebarRail className="hover:bg-sidebar-border/30 transition-colors" />
        </Sidebar>
    );
}
