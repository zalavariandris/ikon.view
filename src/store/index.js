import Vue from 'vue'
import Vuex from 'vuex'
import initSqlJs from 'sql.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: "notLoading",
    database: null
  },
  mutations: {
    SET_LOADING_STATUS(state, status){
      state.loadingStatus = status;
    },
    SET_DATABASE(state, database){
      state.database = database;
    }
  },

  actions:{
    fetchDatabase: function(context){
      context.commit('SET_LOADING_STATUS', 'loading');
      const SQL = initSqlJs({
        locateFile: file => `/${file}`
      }).then((SQL)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "/ikon_v002.db", true);
        xhr.responseType = 'arraybuffer';

        xhr.onprogress = (e)=>{
          let progress = e.loaded/e.total;
          console.log('loading...', progress);
        }

        xhr.onload = (e)=> {
          var uInt8Array = new Uint8Array(xhr.response);
          let db = new SQL.Database(uInt8Array);
          context.commit('SET_DATABASE', db);
          context.commit('SET_LOADING_STATUS', 'notLoading');
        };

        xhr.onerror = ()=>{
          console.log("ERROR loading database:", xhr.statusText);
        }

        xhr.send();
      });
      
    }
  }
})