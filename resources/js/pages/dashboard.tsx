'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Globe } from 'lucide-react';
import MovieCard from '@/components/movieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

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
    const [searchQuery, setSearchQuery] = useState('batman');
    const [searchInput, setSearchInput] = useState('batman');

    // Ref for the sentinel element used by Infinite Scroll
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // Fetch movies when page or searchQuery changes
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const response = await fetch(`/search-movie?q=${encodeURIComponent(searchQuery)}&page=${page}`, {
                    headers: { Accept: 'application/json' },
                });

                const data = await response.json();

                if (data.Response === 'True') {
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
    }, [page, searchQuery]);

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
            rootMargin: '200px',
            threshold: 0,
        });

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [handleObserver]);

    // Handle search submit
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchQuery(searchInput.trim());
            setMovies([]);
            setPage(1);
            setHasMore(true);
        }
    };

    // Toggle language between EN and ID
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
                {/* Main Content */}
                <div className="container mx-auto max-w-7xl p-6">
                    
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                    {t('movie_list')}
                                </h1>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Discover and explore millions of movies
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Search Form */}
                                <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
                                    <div className="relative flex-1">
                                        <Input
                                            type="text"
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                            placeholder={t('search_movies') || 'Search movies...'}
                                            className="h-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="default"
                                        size="default"
                                        disabled={loading || !searchInput.trim()}
                                        className="h-10 px-4 font-medium"
                                    >
                                        <Search className="h-4 w-4 mr-2" />
                                        {t('search') || 'Search'}
                                    </Button>
                                </form>

                                {/* Language Toggle Button */}
                                <button
                                    onClick={toggleLanguage}
                                    className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground backdrop-blur-sm"
                                    title={t('toggle_language')}
                                >
                                    <Globe className="h-4 w-4" />
                                    <span className="hidden sm:inline">{i18n.language === 'en' ? 'EN' : 'ID'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Info */}
                    {movies.length > 0 && (
                        <div className="mb-6 flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">{movies.length}</span> {t('movies') || 'movies'}
                                {searchQuery && (
                                    <span>
                                        {' '}{t('for') || 'for'} "<span className="font-medium text-foreground">{searchQuery}</span>"
                                    </span>
                                )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Page {page}
                            </p>
                        </div>
                    )}

                    {/* Movie Grid */}
                    {movies.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {movies.map((movie, index) => (
                                <MovieCard
                                    key={`${movie.imdbID}-${index}`}
                                    movie={movie}
                                />
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        !loading && searchQuery && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">No movies found</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try searching for a different movie title
                                </p>
                            </div>
                        )
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                <span className="text-sm font-medium">{t('loading')}</span>
                            </div>
                        </div>
                    )}

                    {/* End of List Message */}
                    {!hasMore && movies.length > 0 && (
                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                {t('no_more_movies')}
                            </p>
                        </div>
                    )}

                    {/* Sentinel element for Infinite Scroll */}
                    <div ref={sentinelRef} className="h-1" />
                </div>
            </div>
        </AppLayout>
    );
}
