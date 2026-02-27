import { useTranslation } from 'react-i18next';

export default function LanguageToggle({ className }: { className?: string }) {
    const { i18n, t } = useTranslation();

    const toggle = () => {
        const newLang = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggle}
            className={className || 'inline-flex items-center gap-2 px-3 py-2 rounded-md bg-transparent text-sm text-gray-200 hover:bg-white/5'}
            title={t('toggle_language')}
        >
            🌐 {i18n.language === 'en' ? 'EN' : 'ID'}
        </button>
    );
}
