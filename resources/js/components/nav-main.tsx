'use client';

import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();
    const { state } = useSidebar();

    return (
        <SidebarGroup className="px-2 py-4">
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
                Menu
            </SidebarGroupLabel>
            <SidebarMenu className="mt-2 space-y-1">
                {items.map((item) => {
                    const isActive = isCurrentUrl(item.href);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className={`
                                    group relative overflow-hidden rounded-lg transition-all duration-200
                                    ${isActive 
                                        ? 'bg-gradient-to-r from-red-500/10 to-red-500/5 text-red-500 dark:from-red-500/20 dark:to-red-500/10' 
                                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    }
                                `}
                            >
                                <Link href={item.href} prefetch className="flex items-center gap-3">
                                    <item.icon
                                        className={`
                                            h-5 w-5 transition-transform duration-200 
                                            ${isActive ? 'text-red-500 scale-110' : 'text-muted-foreground group-hover:text-foreground'}
                                        `} 
                                    />
                                    <span className="font-medium text-sm">{item.title}</span>
                                    {isActive && state !== 'collapsed' && (
                                        <ChevronRight className="ml-auto h-4 w-4 text-red-500" />
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
