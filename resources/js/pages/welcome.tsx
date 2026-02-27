import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/components/language-toggle';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    const { t } = useTranslation();

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // ================= RANDOM MOVIES ON LOAD =================
    useEffect(() => {
        const fetchRandom = async () => {
            try {
                setLoading(true);

                const keywords = [
                    "avengers",
                    "batman",
                    "spiderman",
                    "harry potter",
                    "transformers",
                ];

                const randomKeyword =
                    keywords[Math.floor(Math.random() * keywords.length)];

                const response = await fetch(`/search-movie?q=${randomKeyword}`);
                const data = await response.json();

                // Aman untuk dua kemungkinan response
                const movieData = data.Search
                    ? data.Search.slice(0, 10)
                    : data.slice(0, 10);

                setMovies(movieData || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandom();
    }, []);

    // ================= HANDLE SEARCH =================
    const handleSearch = async () => {
        if (!query) return;

        try {
            setLoading(true);

            const response = await fetch(`/search-movie?q=${query}`);
            const data = await response.json();

            const movieData = data.Search
                ? data.Search.slice(0, 5)
                : data.slice(0, 5);

            setMovies(movieData || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="OMDB Movies" />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

                {/* NAVBAR */}
                <header className="w-full border-b border-white/10 bg-white/5 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <h1 className="text-2xl font-bold">
                            🎬 OMDB<span className="text-red-500">Movies</span>
                        </h1>

                        <nav className="flex items-center gap-4 text-sm">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="hover:text-red-400 transition"
                                    >
                                        Log in
                                    </Link>

                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700 transition"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                            <div className="ml-3">
                                <LanguageToggle />
                            </div>
                        </nav>
                    </div>
                </header>

                {/* HERO */}
                <section className="py-24 text-center px-6">
                    <h2 className="text-4xl md:text-6xl font-bold">
                        {t('hero_title')}
                    </h2>
                    <p className="mt-6 text-gray-400">{t('hero_subtitle')}</p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Link
                            href={auth.user ? dashboard() : login()}
                            className="rounded-lg bg-red-600 px-6 py-3 hover:bg-red-700 transition font-semibold"
                        >
                            {auth.user ? t('cta_go_dashboard') : t('cta_get_started')}
                        </Link>

                        {canRegister && !auth.user && (
                            <Link
                                href={register()}
                                className="rounded-lg border border-white/10 px-6 py-3 hover:bg-white/5 transition text-sm"
                            >
                                {t('cta_create_account')}
                            </Link>
                        )}
                    </div>
                </section>

                {/* SEARCH */}
                <section className="mx-auto max-w-5xl px-6 pb-16">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
                        <div className="flex gap-4">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t('search_placeholder')}
                                className="flex-1 rounded-lg bg-black/40 border border-white/10 px-4 py-2 outline-none"
                            />

                            <button
                                onClick={handleSearch}
                                className="rounded-lg bg-red-600 px-6 py-2 hover:bg-red-700 transition"
                            >
                                {t('search_button')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* LANDING MOVIES GRID */}
                <section className="mx-auto max-w-7xl px-6 pb-20">
                    <h3 className="text-3xl font-bold text-center mb-8">⭐ {t('featured_heading')}</h3>

                    <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">{t('featured_description')}</p>

                    {loading && (
                        <p className="text-center text-gray-400">Loading...</p>
                    )}

                    {!loading && movies.length === 0 && (
                        <p className="text-center text-gray-400">{t('no_movies_found')}</p>
                    )}

                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="relative"
                            >
                                <div
                                    onClick={() => {
                                        if (!auth.user) {
                                            setShowModal(true);
                                        } else {
                                            window.location.href = `/movies/${movie.imdbID}`;
                                        }
                                    }}
                                    className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:scale-105 transition"
                                >
                                        <img
                                            src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/images/no-poster.svg'}
                                            alt={movie.Title}
                                            className="h-64 w-full object-cover"
                                            loading="lazy"
                                        />

                                        <div className="p-4">
                                            <h4 className="font-semibold text-lg truncate">{movie.Title}</h4>
                                            <p className="text-sm text-gray-400">{movie.Year}</p>
                                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} OMDB Movies. Built with Laravel & React.
                </footer>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                        <div className="bg-slate-900 p-8 rounded-2xl w-96 text-center border border-white/10">
                                <h2 className="text-2xl font-bold mb-4">{t('modal_not_logged_title')}</h2>
                                <p className="text-gray-400 mb-6">{t('modal_not_logged_message')}</p>

                            <div className="flex justify-center gap-4">
                                <Link
                                    href={login()}
                                    className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    {t('modal_login_button')}
                                </Link>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="border border-white/20 px-6 py-2 rounded-lg hover:bg-white/10 transition"
                                >
                                    {t('modal_close_button')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}