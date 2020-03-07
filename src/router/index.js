import Vue from 'vue'
import VueRouter from 'vue-router'
import ExhibitionListView from '../components/ExhibitionListView.vue'
import ArtistListView from '../components/ArtistListView.vue'
import GalleryListView from '../components/GalleryListView.vue'

import ExhibitionView from '../components/ExhibitionView.vue'
import ArtistView from '../components/ArtistView.vue'
import GalleryView from '../components/GalleryView.vue'

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