'use client';

import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';

type Props = React.ComponentProps<'main'> & {
    variant?: 'header' | 'sidebar';
};

export function AppContent({ variant = 'header', children, className, ...props }: Props) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset 
                className={`flex flex-col ${className || ''}`} 
                {...props}
            >
                {children}
            </SidebarInset>
        );
    }

    return (
        <main
            className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4 md:p-6"
            {...props}
        >
            {children}
        </main>
    );
}
