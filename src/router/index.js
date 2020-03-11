import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPageView from '../views/LandingPageView.vue'

import ExhibitionListView from '../views/ExhibitionListView.vue'
import ArtistListView from '../views/ArtistListView.vue'
import GalleryListView from '../views/GalleryListView.vue'

import ExhibitionView from '../views/ExhibitionView.vue'
import ArtistView from '../views/ArtistView.vue'
import GalleryView from '../views/GalleryView.vue'

Vue.use(VueRouter)
const routes = [
  { name: 'home',        path: '/', component: LandingPageView},
  { name: 'exhibitions', path: '/exhibitions',     component: ExhibitionListView },
  { name: 'artists',     path: '/artists',         component: ArtistListView },
  { name: 'galleries',	 path: '/galleries',       component: GalleryListView },

  { name: 'exhibition',  path: '/exhibitions/:id', component: ExhibitionView},
  { name: 'artist',      path: '/artists/:id',     component: ArtistView},
  { name: 'gallery',     path: '/galleries/:id',   component: GalleryView},
]
const router = new VueRouter({
  routes, // short for `routes: routes`
});

router.beforeEach( (to, from, next)=>{
	document.body.className = to.name;
	document.title = 'ikon.view - '+to.name;
	next();
} );
export default router;