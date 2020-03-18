<template>
  <div class="GalleryListView">
    <h2>Galleries <small>({{count}})</small></h2>
    <input v-model="search" placeholder="filter">
    <vpaginate 
      v-model="page"
      :count="Math.ceil(resultsCount/limit)">
    </vpaginate>
    <table>
      <thead>
        <td>name</td>
      </thead>
      <tbody>
        <tr v-for='g in galleries' v-bind:key="g.id">
          <td>
            <router-link :to="{name: 'gallery', params: {id: g.id}}">
              {{g.name}}
           </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '../store'
  import vpaginate from '../components/vpaginate'
  export default {
    name: 'GalleryListView',
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
      galleries: function(){
        return this.$store.getters.getGalleriesLikeName(this.search, this.limit, this.page);
      },

      count: function(){
        return this.$store.getters.galleriesCount;
      },

      resultsCount: function(){
        return this.$store.getters.getGalleriesLikeNameCount(this.search);

      }
    },

    watch:{
      search: function(){
        this.page = 0;
      }
    }


  }
</script>