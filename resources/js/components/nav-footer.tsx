'use client';

import { ExternalLink } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup
            {...props}
            className={`px-2 py-2 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="group rounded-lg transition-all duration-200 hover:bg-sidebar-accent"
                            >
                                <a
                                    href={toUrl(item.href)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon && (
                                            <item.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                                        )}
                                        <span className="text-sm font-medium">{item.title}</span>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
