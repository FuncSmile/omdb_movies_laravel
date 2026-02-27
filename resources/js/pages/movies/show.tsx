import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';

export default function MovieShow(props: { id: string }) {
    const { id } = props;
    const { t } = useTranslation();

    const [movie, setMovie] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/movie-detail?id=${encodeURIComponent(id)}`, {
                    headers: { Accept: 'application/json' },
                });
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    const addFavorite = async () => {
        if (!movie || saving || saved) return;
        setSaving(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            await fetch('/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
                body: JSON.stringify(movie),
            });

            setSaved(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AppLayout>
            <Head title={movie?.Title || t('movie_detail')} />

            <div className="p-6 text-white">
                {loading && <p>{t('loading')}</p>}

                {!loading && movie && (
                    <div className="max-w-4xl mx-auto rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 w-full">
                                <img
                                    src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/images/no-poster.svg'}
                                    alt={movie.Title}
                                    loading="lazy"
                                    className="w-full h-80 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/no-poster.svg';
                                    }}
                                />
                            </div>

                            <div className="p-6 md:w-2/3 w-full">
                                <h1 className="text-2xl font-bold text-white">{movie.Title}</h1>
                                <p className="text-sm text-gray-400 mt-1">{movie.Year} • <span className="text-red-400">{movie.Type}</span></p>

                                <p className="mt-4 text-gray-300 leading-relaxed">{movie.Plot}</p>

                                <div className="mt-6 flex items-center gap-3">
                                    <button
                                        onClick={addFavorite}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                                    >
                                        {saving ? t('saving') : saved ? t('saved') : t('add_favorite')}
                                    </button>

                                    <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-gray-200">
                                        {t('view_on_imdb')} ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
