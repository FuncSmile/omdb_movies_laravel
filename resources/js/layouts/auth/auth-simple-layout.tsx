import { Link } from '@inertiajs/react';
import { /* useTranslation */ } from 'react-i18next';
import LanguageToggle from '@/components/language-toggle';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    // ...existing code...
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
                    <div className="flex flex-col items-center gap-4 mb-4 relative">
                        <Link href={home()} className="text-center">
                            <div className="text-2xl font-bold">
                                🎬 OMDB<span className="text-red-500">Movies</span>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold text-white">{title}</h1>
                            <p className="text-center text-sm text-gray-400">{description}</p>
                        </div>

                        <div className="absolute top-0 right-0 mt-3 mr-3">
                            <LanguageToggle className="rounded-md px-2 py-1 text-sm bg-transparent hover:bg-white/5" />
                        </div>
                    </div>

                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}
