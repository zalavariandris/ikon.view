import HomeView from '../views/HomeView.vue'

import ExhibitionListView from '../views/ExhibitionListView.vue'
import ArtistListView from '../views/ArtistListView.vue'
import GalleryListView from '../views/GalleryListView.vue'

import ArtistView from '../views/ArtistView.vue'
import ExhibitionView from '../views/ExhibitionView.vue'
import GalleryView from '../views/GalleryView.vue'

export default [
  { name: 'home',        path: '/',                  component: HomeView},
  { name: 'exhibitions', path: '/exhibitions',       component: ExhibitionListView },
  { name: 'artists',     path: '/artists',           component: ArtistListView},
  { name: 'galleries',	 path: '/galleries',         component: GalleryListView },

  { name: 'exhibition',  path: '/exhibition/:id',    component: ExhibitionView},
  { name: 'artist',      path: '/artist/:id/:page?', component: ArtistView},
  { name: 'gallery',     path: '/gallery/:id',       component: GalleryView}
]