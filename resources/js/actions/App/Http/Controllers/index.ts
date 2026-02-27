import FavoriteController from './FavoriteController'
import Settings from './Settings'

const Controllers = {
    FavoriteController: Object.assign(FavoriteController, FavoriteController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers