import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MovieCard from '@/components/movieCard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    const { t, i18n } = useTranslation();

    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    // Ref for the sentinel element used by Infinite Scroll
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // Fetch movies when page changes
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const response = await fetch(`/search-movie?q=batman&page=${page}`, {
                    headers: { Accept: 'application/json' },
                });

                const data = await response.json();

                if (data.Response === 'True') {
                    if (totalResults === 0) {
                        setTotalResults(Number(data.totalResults));
                    }

                    setMovies(prev => {
                        const newMovies = data.Search.filter(
                            (newMovie: any) =>
                                !prev.some(existing => existing.imdbID === newMovie.imdbID)
                        );
                        return [...prev, ...newMovies];
                    });

                    const maxPages = Math.ceil(Number(data.totalResults) / 10);
                    if (page >= maxPages) {
                        setHasMore(false);
                    }
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    // Infinite Scroll: observe sentinel element
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        },
        [hasMore, loading]
    );

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '200px', // trigger 200px before sentinel enters viewport
            threshold: 0,
        });

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [handleObserver]);

    // Toggle language between EN and ID
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen p-6 text-white">

                {/* Header with language switcher */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">
                        {t('movie_list')}
                    </h1>

                    {/* Language Toggle Button */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm font-medium"
                        title={t('toggle_language')}
                    >
                        🌐 {i18n.language === 'en' ? 'EN' : 'ID'}
                    </button>
                </div>

                {/* Movie Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={`${movie.imdbID}-${index}`}
                            movie={movie}
                        />
                    ))}
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <p className="text-gray-400 mt-6 text-center">
                        {t('loading')}
                    </p>
                )}

                {/* End of list message */}
                {!hasMore && (
                    <p className="text-gray-500 mt-6 text-center">
                        {t('no_more_movies')}
                    </p>
                )}

                {/* Sentinel element for Infinite Scroll */}
                <div ref={sentinelRef} className="h-1" />

            </div>
        </AppLayout>
    );
}