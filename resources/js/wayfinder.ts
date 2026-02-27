// Manual wayfinder types - generated automatically by @laravel/vite-plugin-wayfinder
export type RouteQueryOptions = Record<string, string | number | boolean | null>;

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

export type RouteDefinition<TMethod extends HttpMethod = HttpMethod> = {
    url: string;
    method: TMethod;
};

export type RouteFormDefinition<TMethod extends HttpMethod = HttpMethod> = {
    action: string;
    method: TMethod;
};

export function queryParams(options?: RouteQueryOptions): string {
    if (!options || Object.keys(options).length === 0) {
        return '';
    }

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options)) {
        if (value !== null && value !== undefined) {
            params.append(key, String(value));
        }
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
}

export function applyUrlDefaults<T extends Record<string, string | number>>(args: T): T {
    return args;
}
