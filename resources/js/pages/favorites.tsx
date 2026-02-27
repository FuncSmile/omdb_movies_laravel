import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MovieCard from '@/components/movieCard';
import AppLayout from '@/layouts/app-layout';

export default function FavoritesPage() {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const res = await fetch('/favorites', { headers: { Accept: 'application/json' } });
            const data = await res.json();
            setFavorites(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const remove = async (id: number) => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            await fetch(`/favorites/${id}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': token, Accept: 'application/json' },
            });
            setFavorites((prev) => prev.filter((f) => f.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AppLayout>
            <Head title={t('favorites')} />

            <div className="min-h-screen p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">{t('favorites')}</h1>
                </div>

                {loading && <p className="text-gray-400">{t('loading')}</p>}

                {!loading && favorites.length === 0 && (
                    <p className="text-gray-400">{t('no_favorites')}</p>
                )}

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {favorites.map((fav) => (
                        <div key={fav.id} className="relative">
                            <MovieCard
                                movie={{
                                    imdbID: fav.imdb_id,
                                    Title: fav.title,
                                    Year: fav.year,
                                    Poster: fav.poster || '/images/no-poster.svg',
                                    Type: fav.type || 'movie',
                                }}
                                showFavoriteButton={false}
                            />

                            <button
                                onClick={() => remove(fav.id)}
                                className="absolute top-3 right-3 bg-black/50 text-red-400 px-2 py-1 rounded"
                            >
                                {t('remove')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
