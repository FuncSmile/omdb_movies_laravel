import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="mb-0.5 truncate leading-tight font-semibold text-sm">
                    🎬 OMDB<span className="text-red-500">Movies</span>
                </span>
                <small className="text-xs text-gray-300">Discover & save favorites</small>
            </div>
        </>
    );
}
