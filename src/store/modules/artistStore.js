import axios from 'axios'
import config from '@/config.js'

const artistStore = {
    namespaced: true,
    state: {
        currentArtist: null,
        exhibitions: []
    },

    mutations:{
        SET_CURRENT_ARTIST(state, artist){
          state.currentArtist = artist;
        },

        SET_EXHIBITIONS(state, exhibitions){
          state.exhibitions = exhibitions;
        }
    },

    actions: {
        fetchArtist: (context, id)=>{
          axios.get(config.servicePath+'/artist/'
            +id)
          .then( (response)=>{
            context.commit('SET_CURRENT_ARTIST', response.data);
          });
        },

        fetchExhibitions: (context, id)=>{
          axios.get(config.servicePath+'/artist/'
            +id
            +'/exhibitions')
          .then( (response)=>{
            context.commit('SET_EXHIBITIONS', response.data);
          });
        }
    }
}

export default artistStore;