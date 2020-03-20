import Vue from 'vue'
import Vuex from 'vuex'
import initSqlJs from 'sql.js';
import artistStore from './modules/artistStore.js'
import exhibitionStore from './modules/exhibitionStore.js'
import galleryStore from './modules/galleryStore.js'
import searchStore from './modules/searchStore.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    artist: artistStore,
    exhibition: exhibitionStore,
    gallery: galleryStore,
    search: searchStore
  },

  state: {
    loadingStatus: "notLoading",
    loadingProgress: 0,
    database: null,
    error_msg: "",
  },

  mutations: {
    //
    SET_LOADING_STATUS(state, status){
      state.loadingStatus = status;
    },

    SET_LOADING_PROGRESS(state, progress){
      state.loadingProgress = progress;
    },
    
    SET_DATABASE(state, database){
      state.database = database;
    },

    SET_ERROR_MSG(state, msg){
      state.error_msg = msg;
    },
  },

  actions:{
    fetchDatabase: function(context){
      context.commit('SET_LOADING_STATUS', 'loading');
      initSqlJs({
        locateFile: file => `./${file}`
      }).then((SQL)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "./ikon_v007.db", true);
        xhr.responseType = 'arraybuffer';

        xhr.onprogress = (event)=>{
          let progress = event.loaded/event.total;
          context.commit('SET_LOADING_PROGRESS', progress);
        }

        xhr.onload = ()=> {
          var uInt8Array = new Uint8Array(xhr.response);
          let db = new SQL.Database(uInt8Array);
          context.commit('SET_DATABASE', db);
          context.commit('SET_LOADING_STATUS', 'notLoading');
        };

        xhr.onerror = ()=>{
          alert("ERROR loading database:", xhr.statusText);
          context.commit('SET_ERROR_MSG', xhr.statusText);
        }

        xhr.send();
      }); 
    }
  }
})