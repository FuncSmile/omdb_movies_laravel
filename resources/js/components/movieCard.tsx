import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

interface MovieCardProps {
    movie: Movie;
    showFavoriteButton?: boolean;
}

export default function MovieCard({ movie, showFavoriteButton = true }: MovieCardProps) {
    const { t } = useTranslation();

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const posterUrl =
        movie.Poster && movie.Poster !== 'N/A'
            ? movie.Poster
            : '/images/no-poster.svg'; // fallback image

    return (
        <Link
            href={`/movies/${movie.imdbID}`}
            className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:scale-105 transition"
        >
            {/* Image */}
            <img
                src={posterUrl}
                alt={movie.Title}
                loading="lazy"
                decoding="async"
                className="h-64 w-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/no-poster.svg';
                }}
            />

            <div className="p-4">
                <h2 className="font-semibold text-lg truncate">{movie.Title}</h2>

                <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                    <span>{movie.Year}</span>
                    <span className="capitalize text-xs text-gray-300">{movie.Type}</span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-xs text-red-400 hover:text-red-300">{t('view_detail')} →</p>

                    {showFavoriteButton && (
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (saving || saved) return;
                                setSaving(true);
                                try {
                                    const token = document
                                        .querySelector('meta[name="csrf-token"]')
                                        ?.getAttribute('content') || '';

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
                                    console.error('Favorite error', err);
                                } finally {
                                    setSaving(false);
                                }
                            }}
                            className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs text-white"
                            title={t('add_favorite')}
                        >
                            {saving ? t('saving') : saved ? t('saved') : t('add_favorite')}
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
}