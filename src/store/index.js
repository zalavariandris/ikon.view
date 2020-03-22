import Vue from 'vue'
import Vuex from 'vuex'
import artistStore from './modules/artistStore.js'
import exhibitionStore from './modules/exhibitionStore.js'
import galleryStore from './modules/galleryStore.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    artist: artistStore,
    exhibition: exhibitionStore,
    gallery: galleryStore
  }
});