<template>
  <div class="ArtistListView">
    <h2>Artists</h2>
    <vpaginate 
      v-model="page"
      :count="Math.ceil(count/limit)">
    </vpaginate>
    <table>
      <thead>
        <td><input v-model="search" placeholder="search name"></td>
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

    created: function(){
      this.$store.dispatch('searchArtists', {
        name: this.search, 
        limit: this.limit, 
        page: this.page
      });

      this.$watch(()=>[this.search, this.limit, this.page], ()=>{
        this.$store.dispatch('searchArtists', {
          name: this.search, 
          limit: this.limit, 
          page: this.page
        });
      } );
    },

    computed:{
      artists: function(){
        return this.$store.state.search.artists.data;
      },

      count: function(){
        return this.$store.state.search.artists.count;
      },

      total: function(){
        return this.$store.state.search.artists.total;
      }
    },

    watch:{
      search: function(){
        this.page = 1;
      }
    }
  }
</script>