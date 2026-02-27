import { queryParams,   applyUrlDefaults } from './../../wayfinder'
import type {RouteQueryOptions, RouteDefinition} from './../../wayfinder';
/**
* @see \App\Http\Controllers\FavoriteController::index
* @see app/Http/Controllers/FavoriteController.php:11
* @route '/favorites'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/favorites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FavoriteController::index
* @see app/Http/Controllers/FavoriteController.php:11
* @route '/favorites'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FavoriteController::index
* @see app/Http/Controllers/FavoriteController.php:11
* @route '/favorites'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FavoriteController::index
* @see app/Http/Controllers/FavoriteController.php:11
* @route '/favorites'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FavoriteController::store
* @see app/Http/Controllers/FavoriteController.php:22
* @route '/favorites'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/favorites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FavoriteController::store
* @see app/Http/Controllers/FavoriteController.php:22
* @route '/favorites'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FavoriteController::store
* @see app/Http/Controllers/FavoriteController.php:22
* @route '/favorites'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FavoriteController::destroy
* @see app/Http/Controllers/FavoriteController.php:50
* @route '/favorites/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/favorites/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FavoriteController::destroy
* @see app/Http/Controllers/FavoriteController.php:50
* @route '/favorites/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FavoriteController::destroy
* @see app/Http/Controllers/FavoriteController.php:50
* @route '/favorites/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/my-favorites'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/my-favorites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/my-favorites'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/my-favorites'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/my-favorites'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

const favorites = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    page: Object.assign(page, page),
}

export default favorites