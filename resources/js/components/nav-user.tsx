'use client';

import { Link, router, usePage } from '@inertiajs/react';
import { ChevronsUpDown, LogOut, Settings, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';

export function NavUser() {
    const { auth } = usePage().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const user = auth.user;
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="group data-[state=open]:bg-sidebar-accent rounded-lg transition-all duration-200 hover:bg-sidebar-accent/50"
                        >
                            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/10 ring-2 ring-sidebar-border group-hover:ring-primary/30 transition-all">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>
                            <div className="grid flex-1 text-left transition-all group-data-[collapsible=icon]:opacity-0">
                                <span className="truncate text-sm font-medium">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56 rounded-lg border border-border/50 bg-black p-1 shadow-lg"
                        align="end"
                        side={
                            isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                  ? 'left'
                                  : 'bottom'
                        }
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={edit()}
                                    className="flex w-full cursor-pointer items-center gap-2"
                                    prefetch
                                    onClick={cleanup}
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                href={logout()}
                                className="flex w-full cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
                                as="button"
                                method="post"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Log out</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
