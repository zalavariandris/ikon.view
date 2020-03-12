<template>
  <div class="ArtistListView">
    <h2>Artists
    <small>({{count}})</small>
    </h2>

    <input v-model="search" placeholder="filter">
    <vpaginate 
      v-model="page"
      :count="Math.ceil(resultsCount/limit)">
    </vpaginate>
    <table>
      <thead>
        <td>name</td>
        <td width='70px'>exhibitions</td>
      </thead>
      <tbody>
        <tr v-for='a in artists' v-bind:key="a.id">
          <td>
            <router-link :to="{name: 'artist', params: {id: a.id}}">
              {{a.name}}
            </router-link>
          </td>
          <td>{{a.count}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '../store'
  import vpaginate from '../components/vpaginate'
  export default {
    name: 'ArtistListView',
    store,
    components:{
      vpaginate
    },
    data: function(){
      return {
        search: "",
        limit: 15,
        page: 1
      };
    },
    
    computed:{
      artists: function(){
        return this.$store.getters.getArtistsLikeName(this.search, this.limit, this.page)
      },

      count: function(){
        return this.$store.getters.artistsCount;
      },

      resultsCount: function(){
        return this.$store.getters.getArtistsLikeNameCount(this.search, this.limit, this.page);
      }
    },

    watch:{
      search: function(){
        this.page = 0;
      }
    }
  }
</script>