import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="100%" height="100%" rx="10" fill="#111827" />
            <g transform="translate(8,8) scale(0.75)">
                <path d="M20 4c-8 0-16 6-16 14s8 14 16 14 16-6 16-14S28 4 20 4zm0 4c6 0 12 4 12 10s-6 10-12 10S8 24 8 18s6-10 12-10z" fill="#ef4444" />
                <text x="20" y="38" fontSize="10" textAnchor="middle" fill="#fff" fontFamily="sans-serif">OMDB</text>
            </g>
        </svg>
    );
}
