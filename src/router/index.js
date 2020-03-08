import Vue from 'vue'
import VueRouter from 'vue-router'
import ExhibitionListView from '../views/ExhibitionListView.vue'
import ArtistListView from '../views/ArtistListView.vue'
import GalleryListView from '../views/GalleryListView.vue'

import ExhibitionView from '../views/ExhibitionView.vue'
import ArtistView from '../views/ArtistView.vue'
import GalleryView from '../views/GalleryView.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/exhibitions', component: ExhibitionListView },
  { path: '/artists', component: ArtistListView },
  { path: '/galleries', component: GalleryListView },

  { name: 'exhibition', path: '/exhibition/:id', component: ExhibitionView},
  { name: 'artist', path: '/artist/:id', component: ArtistView},
  { name: 'gallery', path: '/gallery/:id', component: GalleryView},
]

export default new VueRouter({
  routes // short for `routes: routes`
});